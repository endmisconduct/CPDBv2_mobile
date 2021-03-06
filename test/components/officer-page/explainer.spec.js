import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import { MemoryRouter } from 'react-router-dom';

import RadarExplainer from 'components/officer-page/radar-chart/explainer';
import TriangleExplainer from 'components/officer-page/radar-chart/explainer/triangle-explainer';
import ScaleExplainer from 'components/officer-page/radar-chart/explainer/scale-explainer';
import PercentileExplainer from 'components/officer-page/radar-chart/explainer/percentile-explainer';


describe('Explainer component', function () {
  const data = [{
    items: [
      { axis: 'Use of Force Reports', value: 20 },
      { axis: 'Civilian Complaints', value: 0 },
      { axis: 'Internal Complaints', value: 10 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }, {
    items: [
      { axis: 'Use of Force Reports', value: 40 },
      { axis: 'Civilian Complaints', value: 50 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }, {
    items: [
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ],
    textColor: 'black',
    visualTokenBackground: 'white',
  }];

  const mockStore = configureStore();
  const store = mockStore({
    officerPage: {
      cms: [{ type: 'rich_text', name: 'triangle_description' }],
    },
  });

  it('should render TriangleExplainer by default', function () {
    const closeExplainerSpy = spy();

    let radarExplainer = null;
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <RadarExplainer
            ref={ (c) => {radarExplainer = c;} }
            percentileData={ data }
            closeExplainer={ closeExplainerSpy }
          />
        </MemoryRouter>
      </Provider>
    );

    const triangleExplainer = wrapper.find(TriangleExplainer);
    triangleExplainer.exists().should.be.true();

    triangleExplainer.prop('radarChartData').should.deepEqual({
      items: [
        { axis: 'Use of Force Reports', value: 80 },
        { axis: 'Civilian Complaints', value: 70 },
        { axis: 'Internal Complaints', value: 60 },
      ],
      textColor: 'black',
      visualTokenBackground: 'white',
    });
    triangleExplainer.prop('closeExplainer').should.equal(closeExplainerSpy);
    triangleExplainer.prop('leftNavHandler').should.equal(radarExplainer.navigateLeft);
    triangleExplainer.prop('rightNavHandler').should.equal(radarExplainer.navigateRight);
  });

  it('should navigate correctly between explainers', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <RadarExplainer percentileData={ data }/>
        </MemoryRouter>
      </Provider>
    );

    wrapper.find(TriangleExplainer).exists().should.be.true();

    wrapper.find('.left-nav').simulate('click');

    wrapper.find(PercentileExplainer).exists().should.be.true();

    wrapper.find('.left-nav').simulate('click');

    wrapper.find(ScaleExplainer).exists().should.be.true();

    wrapper.find('.left-nav').simulate('click');

    wrapper.find(TriangleExplainer).exists().should.be.true();

    wrapper.find('.right-nav').simulate('click');

    wrapper.find(ScaleExplainer).exists().should.be.true();

    wrapper.find('.right-nav').simulate('click');

    wrapper.find(PercentileExplainer).exists().should.be.true();

    wrapper.find('.right-nav').simulate('click');

    wrapper.find(TriangleExplainer).exists().should.be.true();
  });

  it('should invoke closeExplainer when clicking on the close button', function () {
    const closeExplainerSpy = spy();
    const wrapper = mount(
      <Provider store={ store }>
        <MemoryRouter>
          <RadarExplainer percentileData={ data } closeExplainer={ closeExplainerSpy }/>
        </MemoryRouter>
      </Provider>
    );
    const explainer = wrapper.find(TriangleExplainer);

    explainer.find('.explainer-close-button').simulate('click');

    closeExplainerSpy.calledOnce.should.be.true();
  });
});
