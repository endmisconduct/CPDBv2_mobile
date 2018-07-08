import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { spy, stub } from 'sinon';
import { cloneDeep, noop } from 'lodash';
import configureStore from 'redux-mock-store';
import should from 'should';

import Header from 'components/shared/header';
import OfficerPage from 'components/officer-page';
import OfficerPageContainer from 'containers/officer-page-container';
import OfficerRadarChart from 'components/officer-page/radar-chart';
import LoadingPage from 'components/shared/loading-page';
import NotMatchedOfficerPage from 'components/officer-page/not-matched-officer-page';
import SectionRow from 'components/officer-page/section-row';
import GaUtil from 'utils/ga-util';
import MetricWidget from 'components/officer-page/metric-widget';
import TimeLine from 'components/officer-page/tabbed-pane-section/timeline';


const mockStore = configureStore();
const store = mockStore({
  suggestionApp: {
    query: ''
  },
  breadcrumb: {
    breadcrumbs: []
  }
});

describe('<OfficerPage />', function () {
  beforeEach(function () {
    this.pk = 33;
    this.summary = {
      name: 'Officer 11',
      unit: 'Unit 001 - description',
      demographic: '26 years old, race, male.',
      badge: 'badge',
      historicBadges: ['1', '2'],
      careerDuration: 'SEP 23, 2015—Present',
    };

    this.metrics = {
      allegationCount: 1,
      allegationPercentile: 4.000,
      honorableMentionCount: 3,
      honorableMentionPercentile: 3.000,
      sustainedCount: 4,
      disciplineCount: 5,
      trrCount: 7,
      majorAwardCount: 5,
      trrPercentile: 9.0,
      civilianComplimentCount: 10,
    };

    this.stubTrack = stub(GaUtil, 'track');
  });

  afterEach(function () {
    this.stubTrack.restore();
  });

  it('should be renderable', function () {
    const wrapper = shallow(<OfficerPage />);
    wrapper.should.be.ok();
  });

  it('should render LoadingPage if loading', function () {
    const wrapper = shallow(
      <OfficerPage loading={ true } found={ false }/>
    );
    wrapper.find(LoadingPage).should.have.length(1);
  });

  it('should render NotMatchedOfficerPage if not found', function () {
    const wrapper = shallow(
      <OfficerPage
        loading={ false }
        found={ false }
        getOfficerSummary={ noop }
        />
    );
    wrapper.find(NotMatchedOfficerPage).should.have.length(1);
  });

  it('should be tracked by Google Analytics when mounted', function () {
    mount(
      <Provider store={ store }>
        <OfficerPage loading={ false } found={ false } getOfficerSummary={ noop } fetchOfficer={ noop }/>
      </Provider>
    );

    this.stubTrack.calledWith(
      'event',
      'officer',
      'view_detail',
      window.location.pathname
    ).should.be.true();
  });

  it('should not fetch officer data if summary is already available', function () {
    const spyfetchOfficer = spy();

    const wrapper = shallow(
      <OfficerPage
        loading={ false }
        found={ true }
        fetchOfficer={ spyfetchOfficer }
        summary={ this.summary }
      />
    );

    wrapper.instance().componentDidMount();
    spyfetchOfficer.called.should.be.false();
  });

  it('should fetch officer data if summary is not available', function () {
    const spyfetchOfficer = spy();

    const wrapper = shallow(
      <OfficerPage
        pk={ 123 }
        loading={ false }
        found={ false }
        fetchOfficer={ spyfetchOfficer }
        summary={ null }
      />
    );

    wrapper.instance().componentDidMount();
    spyfetchOfficer.calledWith(123).should.be.true();
  });

  it('should render Header', function () {
    const wrapper = shallow(
      <OfficerPage
        loading={ false }
        found={ true }
        fetchOfficer={ noop }
        summary={ this.summary }
        metrics={ this.metrics }
      />
    );

    wrapper.find(Header).exists().should.be.true();
  });

  it('should have BottomPadding', function () {
    const wrapper = shallow(
      <OfficerPage
        loading={ false }
        found={ true }
        fetchOfficer={ noop }
        summary={ this.summary }
        metrics={ this.metrics }
      />
    );
    wrapper.find('BottomPadding').exists().should.be.true();
  });

  context('inside container', function () {
    const timeline = {
      items: [{
        attachments: [],
        category: 'Illegal Search',
        coaccused: 8,
        crid: '267098',
        date: 'NOV 8',
        finding: 'Not Sustained',
        kind: 'CR',
        outcome: 'No Action Taken',
        unitDescription: 'Mobile Strike Force',
        unitDisplay: ' ',
        unitName: '153',
        year: 2000,
      }]
    };
    const stateData = {
      breadcrumb: {
        breadcrumbs: []
      },
      officerPage: {
        officers: {
          isRequesting: false,
          isSuccess: true,
          data: {
            11: {
              'officer_id': 11,
              'full_name': 'Kenneth Wojtan',
              active: true,
              'allegation_count': 104,
              badge: '8548',
              'historic_badges': ['8547', '8546'],
              'birth_year': 1957,
              'civilian_compliment_count': 4,
              'complaint_percentile': 99.895,
              'date_of_appt': '1993-12-13',
              'date_of_resignation': '2017-01-15',
              'discipline_count': 1,
              gender: 'Male',
              'honorable_mention_count': 55,
              'honorable_mention_percentile': 85.87,
              'major_award_count': 0,
              race: 'White',
              rank: 'Police Officer',
              'sustained_count': 1,
              'trr_count': 3,
              unit: {
                'unit_id': 6,
                description: 'District 005',
                'unit_name': '005',
              },
              percentiles: [
                {
                  'officer_id': 1,
                  year: 2006,
                  'percentile_allegation_civilian': '66.251',
                  'percentile_allegation_internal': '0.023',
                  'percentile_trr': '0.049',
                  'percentile_allegation': '41.001',
                },
                {
                  'officer_id': 1,
                  year: 2007,
                  'percentile_allegation_civilian': '75.065',
                  'percentile_allegation_internal': '0.022',
                  'percentile_trr': '0.046',
                  'percentile_allegation': '31.201'
                }
              ]
            }
          }
        },
        timeline: timeline
      }
    };

    it('should return LoadingPage if request is not complete', function () {
      let requestingSummary = cloneDeep(stateData);
      requestingSummary.officerPage.officers.isRequesting = true;
      const requestingSummaryStore = mockStore(requestingSummary);
      const wrapper = mount(
        <Provider store={ requestingSummaryStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      wrapper.find(LoadingPage).exists().should.be.true();
    });

    it('should return NotMatchedOfficerPage if officer request is not success', function () {
      let requestingOfficer = cloneDeep(stateData);
      requestingOfficer.officerPage.officers.isSuccess = false;
      const requestingOfficerStore = mockStore(requestingOfficer);

      const wrapper = mount(
        <Provider store={ requestingOfficerStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );
      wrapper.find(NotMatchedOfficerPage).exists().should.be.true();
    });

    it('should be able to render officer radar chart', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const officerRadarChart = wrapper.find(OfficerRadarChart);
      officerRadarChart.exists().should.be.true();
      officerRadarChart.prop('percentileData').should.deepEqual([{
        items: [{
          axis: 'Use of Force Reports',
          value: 0.049
        }, {
          axis: 'Internal Allegations',
          value: 0.023
        }, {
          axis: 'Civilian Allegations',
          value: 66.251
        }],
        officerId: 1,
        textColor: '#231F20',
        visualTokenBackground: '#fc5d2c',
        year: 2006
      }, {
        items: [{
          axis: 'Use of Force Reports',
          value: 0.046
        }, {
          axis: 'Internal Allegations',
          value: 0.022
        }, {
          axis: 'Civilian Allegations',
          value: 75.065
        }],
        officerId: 1,
        textColor: '#231F20',
        visualTokenBackground: '#fc5d2c',
        year: 2007
      }]);
    });

    it('should render officer info', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      wrapper.find('.officer-name').text().should.equal('Kenneth Wojtan');
      wrapper.find('.officer-demographic').text().should.equal('60 years old, white, male.');

      const rows = wrapper.find(SectionRow);
      const badgeRow = rows.at(0);
      const rankRow = rows.at(1);
      const unitRow = rows.at(2);
      const careerRow = rows.at(3);

      badgeRow.find('.label').text().should.equal('Badge');
      rankRow.find('.label').text().should.equal('Rank');
      unitRow.find('.label').text().should.equal('Unit');
      careerRow.find('.label').text().should.equal('Career');

      badgeRow.find('.value').text().should.containEql('8548');
      rankRow.find('.value').text().should.equal('Police Officer');
      unitRow.find('.value').text().should.equal('Unit 005 - District 005');
      careerRow.find('.value').text().should.equal('DEC 13, 1993 — JAN 15, 2017');

      badgeRow.find('.historic-badges-toggle').text().should.equal('Previously');
    });

    it('should show historic badges when clicking on Previously Button', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const rows = wrapper.find(SectionRow);
      const badgeRow = rows.at(0);
      const historicBadgesToggle = badgeRow.find('.historic-badges-toggle');
      historicBadgesToggle.simulate('click');

      const historicBadges = wrapper.find('.historic-badges-container');
      historicBadges.text().should.equal('8547, 8546');
      historicBadges.prop('className').should.containEql('expanded');
    });

    it('should hide Previously Button when historic badges is empty', function () {
      let nohistoricBadgesData = cloneDeep(stateData);
      nohistoricBadgesData.officerPage.officers.data[11]['historic_badges'] = [];
      const workingStore = mockStore(nohistoricBadgesData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const rows = wrapper.find(SectionRow);
      const badgeRow = rows.at(0);
      badgeRow.find('.historic-badges-toggle').exists().should.be.false();
      badgeRow.find('.value').text().should.equal('8548');
    });

    it('should render officer metrics with correct props', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const metricWidget = wrapper.find(MetricWidget);
      const metricsProp = metricWidget.prop('metrics');

      metricsProp.should.have.length(6);

      metricsProp[0].name.should.equal('Allegations');
      metricsProp[0].value.should.equal(104);
      metricsProp[0].description.should.equal('More than 99.8% of other officers');

      metricsProp[1].name.should.equal('Sustained');
      metricsProp[1].value.should.equal(1);
      metricsProp[1].isHighlight.should.be.true();
      metricsProp[1].description.should.equal('1 Disciplined');

      metricsProp[2].name.should.equal('Use of Force Reports');
      metricsProp[2].value.should.equal(3);
      metricsProp[2].description.should.equal('More than 0% of other officers');

      metricsProp[3].value.should.equal(4);

      metricsProp[4].name.should.equal('Major Awards');
      metricsProp[4].value.should.equal(0);

      metricsProp[5].name.should.equal('Honorable Mentions');
      metricsProp[5].value.should.equal(55);
      metricsProp[5].description.should.equal('More than 85% of other officers');
    });

    it('should pluralize content correctly', function () {
      const data = {
        breadcrumb: {
          breadcrumbs: []
        },
        officerPage: {
          officers: {
            isRequesting: false,
            isSuccess: true,
            data: {
              11: {
                'officer_id': 11,
                'full_name': 'Kenneth Wojtan',
                active: true,
                'allegation_count': 1,
                badge: '8548',
                'historic_badges': ['8547', '8546'],
                'birth_year': 1957,
                'civilian_compliment_count': 1,
                'complaint_percentile': 99.895,
                'date_of_appt': '1993-12-13',
                'date_of_resignation': '2017-01-15',
                'discipline_count': 1,
                gender: 'Male',
                'honorable_mention_count': 1,
                'honorable_mention_percentile': 85.87,
                'major_award_count': 1,
                race: 'White',
                rank: 'Police Officer',
                'sustained_count': 1,
                'trr_count': 1,
                unit: {
                  'unit_id': 6,
                  description: 'District 005',
                  'unit_name': '005',
                },
                percentiles: [
                  {
                    'officer_id': 1,
                    year: 2006,
                    'percentile_allegation_civilian': '66.251',
                    'percentile_allegation_internal': '0.023',
                    'percentile_trr': '0.049',
                    'percentile_allegation': '41.001',
                  },
                  {
                    'officer_id': 1,
                    year: 2007,
                    'percentile_allegation_civilian': '75.065',
                    'percentile_allegation_internal': '0.022',
                    'percentile_trr': '0.046',
                    'percentile_allegation': '31.201'
                  }
                ]
              }
            }
          },
          timeline: timeline,
        }
      };

      const wrapper = mount(
        <Provider store={ mockStore(data) }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const metricWidget = wrapper.find(MetricWidget);
      const metricsProp = metricWidget.prop('metrics');

      metricsProp.should.have.length(6);

      metricsProp[0].name.should.equal('Allegation');
      metricsProp[0].value.should.equal(1);

      metricsProp[2].name.should.equal('Use of Force Report');
      metricsProp[2].value.should.equal(1);

      metricsProp[4].name.should.equal('Major Award');
      metricsProp[4].value.should.equal(1);

      metricsProp[5].name.should.equal('Honorable Mention');
      metricsProp[5].value.should.equal(1);
    });

    it('should skip some content if data is not available', function () {
      const data = {
        breadcrumb: {
          breadcrumbs: []
        },
        officerPage: {
          officers: {
            isRequesting: false,
            isSuccess: true,
            data: {
              11: {
                'officer_id': 11,
                'full_name': 'Kenneth Wojtan',
                active: true,
                badge: '8548',
                'historic_badges': ['8547', '8546'],
                'birth_year': 1957,
                'date_of_appt': '1993-12-13',
                'date_of_resignation': '2017-01-15',
                gender: 'Male',
                race: 'White',
                rank: 'Police Officer',
                unit: {
                  'unit_id': 6,
                  description: 'District 005',
                  'unit_name': '005',
                },
                percentiles: []
              }
            }
          },
          timeline: timeline,
        }
      };

      const wrapper = mount(
        <Provider store={ mockStore(data) }>
          <OfficerPageContainer params={ { id: 11 } }/>
        </Provider>
      );

      const metricWidget = wrapper.find(MetricWidget);
      const metricsProp = metricWidget.prop('metrics');

      metricsProp.should.have.length(6);

      metricsProp[0].name.should.equal('Allegations');
      metricsProp[0].value.should.equal('N/A');
      should(metricsProp[0].description).be.null();

      metricsProp[1].name.should.equal('Sustained');
      metricsProp[1].value.should.equal('N/A');
      metricsProp[1].isHighlight.should.be.true();
      should(metricsProp[1].description).be.null();

      metricsProp[2].name.should.equal('Use of Force Reports');
      metricsProp[2].value.should.equal('N/A');
      should(metricsProp[2].description).be.null();

      metricsProp[3].value.should.equal('N/A');

      metricsProp[4].name.should.equal('Major Awards');
      metricsProp[4].value.should.equal('N/A');

      metricsProp[5].name.should.equal('Honorable Mentions');
      metricsProp[5].value.should.equal('N/A');
      should(metricsProp[5].description).be.null();
    });

    it('should render officer Timeline', function () {
      const workingStore = mockStore(stateData);
      const wrapper = mount(
        <Provider store={ workingStore }>
          <OfficerPageContainer params={ { id: 11 } } />
        </Provider>
      );
      wrapper.find(TimeLine).exists().should.be.true();
    });
  });
});