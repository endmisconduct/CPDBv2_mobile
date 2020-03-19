const resultsSection = (name) => ({
  selector: `.results.${name}`,
  sections: {
    firstRow: nthRow(name, 1),
    secondRow: nthRow(name, 2),
    thirdRow: nthRow(name, 3),
    rows: {
      selector: `.results.${name} div a`,
    },
  },
  elements: {
    allLink: '.all',
  },
});

const nthRow = (name, index) => ({
  selector: `a:nth-child(${index})`,
  elements: {
    itemTitle: '.item-title',
    itemSubtitle: '.item-subtitle',
    pinButton: {
      selector: `(//div[contains(@class, "item-pin-button__item-pin-button")])[${index}]`,
      locateStrategy: 'xpath',
    },
    pinButtonIntroduction: {
      selector: `(//div[@class="results ${name}"]//a[contains(@class, "search-item__wrapper")])[${index}]`
        + '//div[@class="pin-button-introduction"]',
      locateStrategy: 'xpath',
    },
  },
});

module.exports = {
  url: function (query = '') {
    let result = `${this.api.globals.clientUrl}/search/`;
    if (query)
      result = `${result}?terms=${query}`;
    return result;
  },

  elements: {
    body: 'body',
    cancelButton: 'button.bt-cancel',
    queryInput: '.query-input',
    backToFullSearchLink: '.back-to-full-search-link',
    recentHeader: '#search-category-recent',
    dateCRsHeader: '#search-category-dateCRs',
    dateTRRsHeader: '#search-category-dateTRRs',
    dateOfficersHeader: '#search-category-dateOfficers',
    crsHeader: '#search-category-crs',
    investigatorCRsHeader: '#search-category-investigatorCRs',
    trrsHeader: '#search-category-trrs',
    officersHeader: '#search-category-officers',
    pinboardBar: '.test--pinboard-bar',
    toast: '.Toastify__toast-body',
    searchBreadcrumb: '.breadcrumb-item:nth-child(3)',
    pinButtonIntroduction: {
      selector: '//div[@class="pin-button-introduction"]',
      locateStrategy: 'xpath',
    },
  },

  sections: {
    recent: {
      selector: '.results.recent',
      sections: {
        firstRecentItem: {
          selector: 'a:nth-child(1)',
          elements: {
            itemTitle: '.item-title',
            itemSubtitle: '.item-subtitle',
            pinButton: {
              selector: '(//div[contains(@class, "recent-items__recent-items")]' +
                '//div[contains(@class, "item-pin-button__item-pin-button")])[1]',
              locateStrategy: 'xpath',
            },
            pinButtonIntroduction: {
              selector: '(//div[@class="results recent"]//a[contains(@class, "search-item__wrapper")])[1]'
                + '//div[@class="pin-button-introduction"]',
              locateStrategy: 'xpath',
            },
          },
        },
        secondRecentItem: {
          selector: 'a:nth-child(2)',
          elements: {
            itemTitle: '.item-title',
            itemSubtitle: '.item-subtitle',
            pinButton: {
              selector: '(//div[contains(@class, "recent-items__recent-items")]' +
                '//div[contains(@class, "item-pin-button__item-pin-button")])[2]',
              locateStrategy: 'xpath',
            },
          },
        },
        thirdRecentItem: {
          selector: 'a:nth-child(3)',
          elements: {
            itemTitle: '.item-title',
            itemSubtitle: '.item-subtitle',
            pinButton: {
              selector: '(//div[contains(@class, "recent-items__recent-items")]' +
                '//div[contains(@class, "item-pin-button__item-pin-button")])[3]',
              locateStrategy: 'xpath',
            },
          },
        },
      },
    },
    dateCRs: resultsSection('dateCRs'),
    dateTRRs: resultsSection('dateTRRs'),
    dateOfficers: resultsSection('dateOfficers'),
    officers: {
      ...resultsSection('officers'),
      commands: [{
        getRowSelector: function (index) {
          return nthRow('officers', index);
        },
      }],
    },
    crs: resultsSection('crs'),
    investigatorCRs: resultsSection('investigatorCRs'),
    trrs: resultsSection('trrs'),
    pinboardIntroduction: {
      selector: '//div[contains(@class, "pinboard-introduction")]',
      locateStrategy: 'xpath',
      elements: {
        content: '.introduction-content',
        closeButton: '.introduction-close-btn',
        getStartedButton: '.get-started-btn',
      },
    },
  },
};
