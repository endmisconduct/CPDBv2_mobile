module.exports = {
  url: function () {
    return this.api.globals.clientUrl;
  },

  elements: {
    victims: '.victim-list',
    complainants: '.complainant-list',
    summary: {
      selector: '//div[contains(@class, "summary")]//div[contains(@class, "content")]',
      locateStrategy: 'xpath'
    },
    investigatorTimeline: {
      selector: '//div[contains(@class, "investigation-timeline")]//*[contains(@class, "svg")]',
      locateStrategy: 'xpath'
    },
    firstInvestigator: {
      selector: '(//div[contains(@class, "investigator-row")])[1]',
      locateStrategy: 'xpath'
    }
  },

  sections: {
    complaintCategory: {
      selector: '//div[contains(@class, "complaint-category")]',
      locateStrategy: 'xpath',
      elements: {
        category: '.category',
        subcategory: '.subcategory'
      }
    },
    coaccusals: {
      selector: '//div[contains(@class, "accused-officers")]',
      locateStrategy: 'xpath',
      elements: {
        header: '.header',
        showAll: '.show-all',
        paddingBottom: '.padding-bottom'
      }
    },
    firstCoaccusal: {
      selector: '(//a[contains(@class, "coaccused-card")])[1]',
      locateStrategy: 'xpath',
      elements: {
        rank: '.officer-rank',
        name: '.officer-name',
        category: '.category',
        findingOutcome: '.finding-outcome'
      }
    },
    firstAttachments: {
      selector: '//a[contains(@class, "attachment")])[1]',
      locateStrategy: 'xpath',
      elements: {
        title: '.attachment-title'
      }
    },
    location: {
      selector: '//div[contains(@class, "location__location")]',
      locateStrategy: 'xpath',
      elements: {
        address: '.address .info',
        type: '.type .info',
        beat: '.beat .info'
      }
    },
  }
};