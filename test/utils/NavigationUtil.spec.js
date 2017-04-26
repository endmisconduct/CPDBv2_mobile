import should from 'should'; // eslint-disable-line no-unused-vars
import { spy, stub, useFakeTimers } from 'sinon';
import * as NavigationUtil from 'utils/NavigationUtil';

describe('NavigationUtil', () => {
  describe('goUp', () => {
    it('should do nothing if already at root path', () => {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/');
      router.push.called.should.be.false();
    });

    it('should go to /reporting/ if currently at /reporting/<id>/', () => {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/reporting/1/');

      router.push.calledWith('/reporting/').should.be.true();
    });

    it('should go to root if currently at /reporting/', () => {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/reporting/');

      router.push.calledWith('/').should.be.true();
    });

    it('should go to straight root if current path is /officer/<id>/', () => {
      const router = { push: spy() };
      NavigationUtil.goUp(router, '/officer/11/');

      router.push.calledWith('/').should.be.true();
    });
  });


  describe('scrollTo', () => {
    beforeEach(function () {
      this.clock = useFakeTimers();
    });

    afterEach(function () {
      this.clock.restore();
    });

    it('should do nothing if duration <= 0', function () {
      const element = { scrollTop: 99 };
      NavigationUtil.animatedScrollTo(element, 3, 0);
      element.scrollTop.should.be.eql(99);
    });

    it('should immediately scroll to top if next scroll step is too short', function () {
      const element = { scrollTop: 1 };
      NavigationUtil.animatedScrollTo(element, 0, 1000);
      element.scrollTop.should.be.eql(0);
    });

    it('should scroll correctly each tick', function () {
      const element = { scrollTop: 500 };
      NavigationUtil.animatedScrollTo(element, 0, 500);
      element.scrollTop.should.be.eql(500);
      this.clock.tick(10);
      element.scrollTop.should.be.eql(490);
      this.clock.tick(490);
      element.scrollTop.should.be.eql(0);
    });
  });


  describe('scrollToTop', () => {
    it('should call scrollTop with appropriate params', function () {
      const animatedScrollTo = spy(NavigationUtil, 'animatedScrollTo');
      NavigationUtil.scrollToTop(animatedScrollTo)();
      animatedScrollTo.called.should.be.true();
      animatedScrollTo.restore();
    });
  });


  describe('scrollToElement', () => {
    it('should set appropriate scrollTop value', function () {
      const stubQuerySelector = stub(document, 'querySelector');
      stubQuerySelector.withArgs('#target').returns({ offsetTop: 200 });
      stubQuerySelector.withArgs('#offset').returns({ offsetHeight: 50 });
      // Have to set body size so that it can actually scroll
      document.body.style.height = '9999px';
      document.body.style.width = '99px';

      NavigationUtil.scrollToElement('#target', '#offset');

      document.body.scrollTop.should.be.eql(150);

      stubQuerySelector.restore();
      document.body.scrollTop = 0;
    });

    it('should do nothing if target element does not exist', () => {
      const stubQuerySelector = stub(document, 'querySelector');
      stubQuerySelector.withArgs('#target').returns(null);
      stubQuerySelector.withArgs('#offset').returns({ offsetHeight: 50 });
      // Have to set body size so that it can actually scroll
      document.body.style.height = '9999px';
      document.body.style.width = '99px';

      NavigationUtil.scrollToElement('#target', '#offset');

      document.body.scrollTop.should.be.eql(0);
      stubQuerySelector.restore();
    });
  });


  describe('instantScrollToTop', () => {
    it('should scroll whole body to top', function () {
      // Have to set body size so that it can actually scroll
      document.body.style.height = '9999px';
      document.body.style.width = '99px';

      document.body.scrollTop = 11;
      document.body.scrollTop.should.be.eql(11);

      NavigationUtil.instantScrollToTop();

      document.body.scrollTop.should.be.eql(0);
    });
  });


  describe('getCurrentScrollPosition', function () {
    beforeEach(function () {
      // Set a great height so that body is scrollable
      this.originalHeight = document.body.style.height;
      document.body.style.height = '9999px';
    });

    afterEach(function () {
      document.body.style.height = this.originalHeight;
    });

    it('should return correct value', function () {
      document.body.scrollTop = 12;
      NavigationUtil.getCurrentScrollPosition().should.eql(12);
    });
  });


  describe('instantScrollTo', function () {
    beforeEach(function () {
      this.stubScrollTo = stub(window, 'scrollTo');
    });

    afterEach(function () {
      this.stubScrollTo.restore();
    });

    it('should call window.scrollTo', function () {
      NavigationUtil.instantScrollTo(111);
      this.stubScrollTo.calledWith(0, 111).should.be.true();
    });
  });
});
