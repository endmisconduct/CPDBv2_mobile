const resultsSection = (name) => ({
  selector: `.results.${name}`,
  sections: {
    firstRow: nthRow(1),
    secondRow: nthRow(2),
    thirdRow: nthRow(3),
  },
});

const nthRow = (n) => ({
  selector: `a:nth-child(${n})`,
  elements: {
    itemTitle: '.item-title',
    itemSubtitle: '.item-subtitle',
    pinButton: '.item-pin-btn',
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
    queryInput: '.query-input',
    clearIcon: '.clear-icon',
    suggestedHeader: '#search-category-suggested',
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
    searchBreadcrumb: '.breadcrumb-item-wrapper:nth-child(3)',
  },

  sections: {
    suggested: {
      selector: '.results.suggested',
      sections: {

        officer: {
          selector: '.row.officer',
          elements: {
            label: '.suggested-type',
            value: '.suggested-title',
          },
        },
      },
    },

    recent: {
      selector: '.results.recent',
      sections: {
        firstRecentItem: {
          selector: 'a:nth-child(1)',
          elements: {
            itemTitle: '.item-title',
            itemSubtitle: '.item-subtitle',
            pinButton: '.item-pin-btn',
          },
        },
        secondRecentItem: {
          selector: 'a:nth-child(2)',
          elements: {
            itemTitle: '.item-title',
            itemSubtitle: '.item-subtitle',
            pinButton: '.item-pin-btn',
          },
        },
        thirdRecentItem: {
          selector: 'a:nth-child(3)',
          elements: {
            itemTitle: '.item-title',
            itemSubtitle: '.item-subtitle',
            pinButton: '.item-pin-btn',
          },
        },
      },
    },

    dateCRs: resultsSection('dateCRs'),
    dateTRRs: resultsSection('dateTRRs'),
    dateOfficers: resultsSection('dateOfficers'),
    officers: {
      selector: '.results.officers',
      sections: {
        firstRow: {
          selector: 'a:nth-child(1)',
          elements: {
            itemTitle: '.item-title',
            itemSubtitle: '.item-subtitle',
          },
        },
      },
    },
    crs: resultsSection('crs'),
    investigatorCRs: resultsSection('investigatorCRs'),
    trrs: resultsSection('trrs'),
  },
};
