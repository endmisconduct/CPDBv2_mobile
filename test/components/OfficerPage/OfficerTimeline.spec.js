import React from 'react';
import { shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import GaUtil from 'utils/GaUtil';
import OfficerTimeline from 'components/OfficerPage/OfficerTimeline';
import NotMatchedOfficerPage from 'components/OfficerPage/NotMatchedOfficerPage';


describe('<OfficerTimeline />', function () {

  beforeEach(function () {
    this.stubTrack = stub(GaUtil, 'track');
  });

  afterEach(function () {
    this.stubTrack.restore();
  });

  it('should be renderable', function () {
    const wrapper = shallow(<OfficerTimeline />);
    wrapper.should.be.ok();
  });

  it('should send GA event', function () {
    const wrapper = shallow(
      <OfficerTimeline
        getOfficerTimeline={ () => {} }
        getOfficerSummary={ () => {} }
      />
    );
    wrapper.instance().componentDidMount();

    this.stubTrack.calledWith('event', 'officer', 'view_detail', window.location.pathname).should.be.true();
  });

  it('should getOfficerTimeline on mount if not available yet', function () {
    const spyGetOfficerTimeline = spy();

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 11 }
        getOfficerTimeline={ spyGetOfficerTimeline }
        getOfficerSummary={ () => {} }
      />
    );
    wrapper.instance().componentDidMount();

    spyGetOfficerTimeline.calledWith(11).should.be.true();
  });

  it('should getOfficerSummary on mount if not available yet', function () {
    const spyGetOfficerSummary = spy();

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        getOfficerTimeline={ () => {} }
        getOfficerSummary={ spyGetOfficerSummary }
      />
    );
    wrapper.instance().componentDidMount();

    spyGetOfficerSummary.calledWith(12).should.be.true();
  });

  it('should render NotMatchedOfficerPage if officer is not found', function () {
    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ false }
      />
    );

    wrapper.type().should.be.eql(NotMatchedOfficerPage);
    wrapper.prop('id').should.be.eql(12);
  });

  it('should render header with officer name', function () {
    const summary = {
      name: 'Foo Bar'
    };
    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        summary={ summary }
      />
    );

    wrapper.find('.header').text().should.be.eql('Foo Bar');
  });

  it('should render CRItem', function () {
    const timeline = {
      results: [
        {
          kind: 'CR',
          foo: 'bar'
        }
      ]
    };

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        timeline={ timeline }
        summary={ {} }
      />
    );

    const crItem = wrapper.find('CRItem');
    crItem.prop('result').should.eql({ kind: 'CR', foo: 'bar' });
  });

  it('should render UnitChangeItem', function () {
    const timeline = {
      results: [
        {
          kind: 'UNIT_CHANGE',
          date: 'Jun 01, 2011',
          'unit_name': '12345'
        }
      ]
    };

    const wrapper = shallow(
      <OfficerTimeline
        pk={ 12 }
        found={ true }
        timeline={ timeline }
        summary={ {} }
      />
    );

    const unitChangeItem = wrapper.find('UnitChangeItem');
    unitChangeItem.prop('date').should.eql('Jun 01, 2011');
    unitChangeItem.prop('unitName').should.eql('12345');
  });
});
