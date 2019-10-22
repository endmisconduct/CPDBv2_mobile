import { spy, useFakeTimers } from 'sinon';

import * as GATracking from 'utils/google_analytics_tracking';


describe('GATracking utils', function () {
  beforeEach(function () {
    spy(window, 'ga');
  });

  afterEach(function () {
    window.ga.restore();
  });

  describe('trackSwipeLanddingPageCarousel', function () {
    it('should send event analytic', function () {
      GATracking.trackSwipeLanddingPageCarousel('left', 'type');

      window.ga.calledWith('send', {
        hitType: 'event',
        eventCategory: 'landing_page_carousel',
        eventAction: 'swipe_left',
        eventLabel: 'type',
      }).should.be.true();
    });
  });

  describe('trackPageView', function () {
    it('should send event analytic', function () {
      GATracking.trackPageView('pathname');

      window.ga.calledWith('send', {
        hitType: 'pageview',
        page: 'pathname',
      }).should.be.true();
    });
  });

  describe('trackSearchResultsCount', function () {
    it('should send event analytic', function () {
      GATracking.trackSearchResultsCount(12);

      window.ga.calledWith('send', {
        hitType: 'event',
        eventCategory: 'search',
        eventAction: 'num_results',
        eventValue: 12,
      }).should.be.true();
    });
  });

  describe('trackSingleSearchResults', function () {
    it('should send event analytic', function () {
      GATracking.trackSingleSearchResults('contentType', 'query', 123);

      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'contentType',
        eventAction: 'single_search',
        eventLabel: 'query',
        eventValue: 123,
      });
    });
  });

  describe('trackSearchFocusedItem', function () {
    it('should send event analytic at most once in 500ms', function () {
      const clock = useFakeTimers();

      GATracking.trackSearchFocusedItem('contentType', 'query', 'itemId1', 1);
      GATracking.trackSearchFocusedItem('contentType', 'query', 'itemId2', 2);
      clock.tick(550);

      global.ga.should.be.calledTwice();
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'contentType',
        eventAction: 'view_search_preview',
        eventLabel: 'itemId2',
        eventValue: 2,
      });
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'contentType',
        eventAction: 'view_search_preview_with_query',
        eventLabel: 'itemId2 - query',
        eventValue: 2,
      });

      clock.tick(1000);
      GATracking.trackSearchFocusedItem('contentType', 'query', 'itemId3');
      clock.tick(550);

      global.ga.callCount.should.equal(4);

      clock.restore();
    });
  });

  describe('trackSearchQuery', function () {
    it('should send event analytic at most once in 500ms', function () {
      const clock = useFakeTimers();

      GATracking.trackSearchQuery('que');
      GATracking.trackSearchQuery('quer');
      clock.tick(550);

      window.ga.calledOnce.should.be.true();
      window.ga.calledWith('send', {
        hitType: 'event',
        eventCategory: 'search',
        eventAction: 'change_query',
        eventLabel: 'quer',
      }).should.be.true();

      clock.tick(1000);
      GATracking.trackSearchQuery('query');
      clock.tick(550);

      window.ga.calledTwice.should.be.true();

      clock.restore();
    });
  });

  describe('trackOpenExplainer', function () {
    it('should send event analytic', function () {
      GATracking.trackOpenExplainer(123);

      window.ga.calledWith('send', {
        hitType: 'event',
        eventCategory: 'visual_token_explainer',
        eventAction: 'open',
        eventValue: 123,
      }).should.be.true();
    });
  });

  describe('trackAttachmentClick', function () {
    it('should send event analytic', function () {
      GATracking.trackAttachmentClick('/', '/complaint/123456/');

      window.ga.calledWith('send', {
        hitType: 'event',
        eventCategory: 'attachment_click',
        eventAction: 'click',
        eventLabel: 'Source URL: / - Target URL: /complaint/123456/',
      }).should.be.true();
    });
  });
});
