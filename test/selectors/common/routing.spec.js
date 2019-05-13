import should from 'should';

import { getPathname } from 'selectors/common/routing';


describe('routing selectors', function () {
  describe('getPathname', () => {
    it('should return current pathname', () => {
      getPathname({
        routing: {
          locationBeforeTransitions: { pathname: '/complaint/123/' }
        }
      }).should.eql('/complaint/123/');

      should(getPathname({})).be.undefined();
    });
  });
});
