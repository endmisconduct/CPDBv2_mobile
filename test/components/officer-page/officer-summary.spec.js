import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import configureStore from 'redux-mock-store';

import Header from 'components/shared/header';
import OfficerSummary from 'components/officer-page/officer-summary';
import LoadingPage from 'components/shared/loading-page';
import NotMatchedOfficerPage from 'components/officer-page/not-matched-officer-page';
import GaUtil from 'utils/ga-util';


const mockStore = configureStore();
const store = mockStore({
  suggestionApp: {
    query: ''
  }
});

describe('<OfficerSummary />', function () {
  beforeEach(function () {
    this.pk = 33;
    this.summary = {
      name: 'John Doe',
      unit: '111',
      rank: 'Dummy Rank',
      badge: '222',
      dateOfAppt: 'Jan 01, 2000',
      yearsSinceDateOfAppt: '17',
      race: 'White',
      sex: 'Male',
      salary: '$1',
      complaints: {
        count: 11,
        facets: [
          {
            name: 'Facet 1',
            entries: []
          }
        ]
      }
    };

    this.stubTrack = stub(GaUtil, 'track');
  });

  afterEach(function () {
    this.stubTrack.restore();
  });

  it('should be renderable', function () {
    const wrapper = shallow(<OfficerSummary />);
    wrapper.should.be.ok();
  });

  it('should render LoadingPage if loading', function () {
    const wrapper = shallow(
      <OfficerSummary
        loading={ true }
        found={ false }
        />
    );
    wrapper.find(LoadingPage).should.have.length(1);
  });

  it('should render NotMatchedOfficerPage if not found', function () {
    const wrapper = shallow(
      <OfficerSummary
        loading={ false }
        found={ false }
        getOfficerSummary={ () => {} }
        />
    );
    wrapper.find(NotMatchedOfficerPage).should.have.length(1);
  });

  it('should be tracked by Google Analytics when mounted', function () {
    mount(
      <Provider store={ store }>
        <OfficerSummary loading={ false } found={ false } getOfficerSummary={ () => {} }/>
      </Provider>
    );

    this.stubTrack.calledWith(
      'event',
      'officer',
      'view_detail',
      window.location.pathname
    ).should.be.true();
  });

  it('should not fetch summary data if already available', function () {
    const spyGetOfficerSummary = spy();

    const wrapper = shallow(
      <OfficerSummary
        loading={ false }
        found={ true }
        getOfficerSummary={ spyGetOfficerSummary }
        summary={ this.summary }
      />
    );

    wrapper.instance().componentDidMount();
    spyGetOfficerSummary.called.should.be.false();
  });

  it('should render Navbar', function () {
    const wrapper = shallow(
      <OfficerSummary
        loading={ false }
        found={ true }
        summary={ this.summary }
      />
    );

    wrapper.find(Header).should.have.length(1);
  });

  describe('when summary is provided', function () {
    beforeEach(function () {
      this.wrapper = shallow(
        <OfficerSummary
          loading={ false }
          found={ true }
          getOfficerSummary={ () => {} }
          summary={ this.summary }
          pk={ this.pk }
        />
      );
    });

    it('should render sticky header', function () {
      const sticky = this.wrapper.find('Sticky');
      sticky.find('.sheet-header').text().should.eql(this.summary.name);
    });

    it('should render "Assignment Details" section', function () {
      const section = this.wrapper.find('.assignment-detail-section');
      const rows = section.find('SectionRow');
      const expectedRows = [
        ['Unit', this.summary.unit],
        ['Rank', this.summary.rank],
        ['Badge', this.summary.badge],
        ['2017 Salary', this.summary.salary],
        ['Career', this.summary.dateOfAppt, this.summary.yearsSinceDateOfAppt],
        ['Race', this.summary.race],
        ['Sex', this.summary.sex]
      ];

      expectedRows.forEach(([label, value, extraInfo], index) => {
        const row = rows.at(index);
        row.prop('label').should.be.eql(label);
        row.prop('value').should.be.eql(value);
        if (extraInfo) {
          row.prop('extraInfo').should.be.eql(extraInfo);
        }
      });
    });

    it('should render SummaryStatsSection', function () {
      this.wrapper.find('SummaryStatsSection').props().should.eql({
        name: 'Complaints',
        data: this.summary.complaints
      });
    });
  });

  it('should have BottomPadding', function () {
    const wrapper = shallow(
      <OfficerSummary loading={ false } found={ true } summary={ this.summary }/>
    );
    wrapper.find('BottomPadding').exists().should.be.true();
  });
});
