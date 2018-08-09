import React from 'react';
import { shallow } from 'enzyme';

import Award from 'components/officer-page/tabbed-pane-section/timeline/item/award';


describe('Award component', function () {
  it('should render item correctly', function () {
    const awardItem = {
      date: 'Jan 01',
      kind: 'CR',
      unitName: '001',
      rank: 'Police Officer',
      category: 'Honorable Mention',
    };

    const instance = shallow(<Award item={ awardItem } hasBorderBottom={ true } />);
    instance.find('.kind').text().should.equal('A');
    instance.find('.category').text().should.equal('Honorable Mention');
    instance.find('.date').text().should.equal('Jan 01');
  });
});
