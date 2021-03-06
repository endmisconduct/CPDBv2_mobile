import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import { mountWithRouter } from 'utils/tests';
import Officers from 'components/embed/officers';
import OfficersContainer from 'containers/embed/officers';
import OfficerCard from 'components/common/officer-card';
import * as IntercomUtils from 'utils/intercom';


describe('<Officers />', function () {
  it('should be renderable', function () {
    const wrapper = shallow(<Officers />);
    wrapper.should.be.ok();
  });

  it('should call request Officers if not requested', function () {
    const requestOfficersSpy = spy();
    mountWithRouter(
      <Officers
        requestOfficers={ requestOfficersSpy }
        officers={ [{ percentile: {} }] }
      />
    );
    requestOfficersSpy.called.should.be.false();

    requestOfficersSpy.resetHistory();

    mount(
      <Officers
        requestOfficers={ requestOfficersSpy }
        officerIds='13788,13789'
      />
    );
    requestOfficersSpy.should.be.calledWith('13788,13789');
  });

  it('should render enough content', function () {
    const officers = [
      {
        'full_name': 'Broderick Jones',
        'complaint_count': 10,
        id: 13788,
      },
      {
        'full_name': 'Queen Jones',
        'complaint_count': 0,
        id: 13789,
      },
    ];

    const wrapper = shallow(
      <Officers
        officers={ officers }
        cmsRequested={ true }
        title='title'
        description='description'
      />
    );

    wrapper.find('.carousel-title').text().should.equal('title');
    wrapper.find('.carousel-description').text().should.equal('description');

    const officerCards = wrapper.find(OfficerCard);
    officerCards.should.have.length(2);

    const firstOfficer = officerCards.at(0);
    const secondOfficer = officerCards.at(1);

    firstOfficer.prop('officer').should.eql({
      'full_name': 'Broderick Jones',
      'complaint_count': 10,
      id: 13788,
    });
    firstOfficer.prop('openCardInNewPage').should.be.true();
    firstOfficer.prop('pinnable').should.be.false();

    secondOfficer.prop('officer').should.eql({
      'full_name': 'Queen Jones',
      'complaint_count': 0,
      id: 13789,
    });
    secondOfficer.prop('openCardInNewPage').should.be.true();
    secondOfficer.prop('pinnable').should.be.false();
  });

  it('should not open intercom', function () {
    const officers = [
      {
        'complaint_count': 104,
        'full_name': 'Broderick Jones',
        id: 13788,
        percentile: {
          items: [
            { axis: 'Use of Force Reports', value: 0 },
            { axis: 'Internal Allegations', value: 87.828 },
            { axis: 'Civilian Allegations', value: 99.9817 },
          ],
          textColor: '#231F20',
          visualTokenBackground: '#f95125',
        },
      },
    ];
    stub(IntercomUtils, 'showIntercomLauncher');

    mountWithRouter(
      <Officers
        officers={ officers }
        title='title'
        description='description'
      />
    );

    IntercomUtils.showIntercomLauncher.calledWith(false).should.be.true();
  });

  describe('officersContainer', function () {
    it('should pass enough prop to Officers', function () {
      const store = configureStore()({
        embed: {
          officers: [
            {
              id: 13788,
              'complaint_count': 104,
              'full_name': 'Broderick Jones',
              'percentile_trr': '0',
              'percentile_allegation': '97.8280',
              'percentile_allegation_internal': '87.8280',
              'percentile_allegation_civilian': '99.98170',
            },
            {
              id: 13789,
              'full_name': 'Queen Jones',
              'complaint_count': 0,
            },
          ],
        },
      });

      const wrapper = mount(
        <Provider store={ store }>
          <MemoryRouter>
            <OfficersContainer
              location={ { search: '?ids=13788,13789&title=title&description=description' } }
            />
          </MemoryRouter>
        </Provider>
      );

      const officers = wrapper.find(Officers);
      officers.prop('officers').should.eql([
        {
          id: 13788,
          'complaint_count': 104,
          'full_name': 'Broderick Jones',
          percentile: {
            items: [
              { axis: 'Use of Force Reports', value: 0 },
              { axis: 'Internal Allegations', value: 87.828 },
              { axis: 'Civilian Allegations', value: 99.9817 },
            ],
            visualTokenBackground: '#F52524',
            textColor: '#DFDFDF',
          },
        },
        {
          id: 13789,
          'full_name': 'Queen Jones',
          'complaint_count': 0,
          percentile: {},
        },
      ]);
      officers.prop('description').should.equal('description');
      officers.prop('title').should.equal('title');
      officers.prop('officerIds').should.equal('13788,13789');
    });
  });

});
