import React from 'react';
import { Link } from 'react-router-dom';

import { mountWithRouter } from 'utils/tests';
import Breadcrumb from 'components/breadcrumb';


describe('Breadcrumb component', function () {
  it('should render breadcrumb', function () {
    const wrapper = mountWithRouter(<Breadcrumb breadcrumbItems={ [
      { path: '/officer/123', text: 'Officer Name', isCurrent: false },
      { path: '/pinboard/123456/pinboard-title', text: 'Pinboard - pinboard-title', isCurrent: true },
    ] }/>);

    const breadcrumbItems = wrapper.find(Breadcrumb).find('div').children();

    breadcrumbItems.should.have.length(5);

    const item1 = breadcrumbItems.at(0);
    const item2 = breadcrumbItems.at(1);
    const item3 = breadcrumbItems.at(2);
    const item4 = breadcrumbItems.at(3);
    const item5 = breadcrumbItems.at(4);

    item1.type().should.equal(Link);
    item1.prop('to').should.equal('/');
    item1.text().should.equal('cpdp');

    item2.prop('className').should.equal('shareable-header-breadcrumb-separator');

    item3.type().should.equal(Link);
    item3.prop('to').should.equal('/officer/123');
    item3.text().should.equal('Officer Name');
    item3.prop('className').should.not.containEql('auto-width');

    item4.prop('className').should.equal('shareable-header-breadcrumb-separator');

    item5.type().should.equal('span');
    item5.text().should.equal('Pinboard - pinboard-title');
    item5.prop('className').should.containEql('auto-width');
  });
});
