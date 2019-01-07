import React from 'react';
import { mount } from 'enzyme';

import Row from 'components/officer-page/tabbed-pane-section/map/legend/row';


describe('Row component', function () {
  let wrapper;

  it('should render row correctly', function () {
    wrapper = mount(
      <Row
        ovalColor={ 'red' }
        ovalBorderColor={ 'black' }
        text={ 'Test Row' }
        number={ 20 }
        haveMarginBottom={ false }
        hovering={ false }
      />
    );
    const rowText = wrapper.find('.legend-row-text');
    rowText.at(0).text().should.eql('Test Row');
    const rowNumber = wrapper.find('.legend-row-number');
    rowNumber.at(0).text().should.eql('20');
  });
});
