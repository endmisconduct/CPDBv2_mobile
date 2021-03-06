import React from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import { mountWithRouter } from 'utils/tests';
import CrItem from 'components/search-page/cr-item';
import SearchItem from 'components/search-page/search-item';


describe('<CrItem />', function () {
  it('should render cr correctly', function () {
    const recentItemData = {
      crid: '1027271',
      url: '/complaint/1027271/',
      category: 'Use Of Force',
      'incident-date': '06/13/2009',
      type: 'CR',
    };
    const cr = {
      crid: '1027271',
      url: '/complaint/1027271/',
      category: 'Use Of Force',
      incidentDate: '06/13/2009',
      isPinned: false,
      type: 'CR',
      recentItemData: recentItemData,
      itemRank: 2,
      showIntroduction: true,
    };

    const store = MockStore()({
      pinboardIntroduction: {
        isPinButtonIntroductionVisited: true,
      },
    });

    const wrapper = mountWithRouter(
      <Provider store={ store }>
        <CrItem
          query='Ke'
          item={ cr }
        />
      </Provider>
    );

    const link = wrapper.find(Link);
    link.should.have.length(1);

    link.prop('to').should.equal('/complaint/1027271/');
    link.find('.item-subtitle').text().should.equal('CRID 1027271 • 06/13/2009');
    link.find('.item-title').text().should.equal('Use Of Force');

    const searchItem = wrapper.find(SearchItem);
    searchItem.prop('id').should.equal('1027271');
    searchItem.prop('query').should.equal('Ke');
    searchItem.prop('type').should.equal('CR');
    searchItem.prop('itemRank').should.equal(2);
    searchItem.prop('showIntroduction').should.be.true();
    searchItem.prop('recentItemData').should.eql(recentItemData);
  });
});
