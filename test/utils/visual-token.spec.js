import {
  getVisualTokenOIGBackground,
  scalePercentile,
  OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT,
  hasEnoughRadarChartData
} from 'utils/visual-token';


describe('VisualToken utils', function () {
  describe('scalePercentile', function () {
    it('should return right key percentile', function () {
      scalePercentile(0).should.be.eql(0);
      scalePercentile(15).should.be.eql(1);
      scalePercentile(20).should.be.eql(1);
      scalePercentile(35).should.be.eql(2);
      scalePercentile(55).should.be.eql(3);
      scalePercentile(75).should.be.eql(4);
      scalePercentile(95).should.be.eql(5);
      scalePercentile(100).should.be.eql(5);
    });
  });

  describe('getVisualTokenOIGBackground', () => {
    it('should return correct background colors when first percentile is 0', () => {
      getVisualTokenOIGBackground(0, 0, 0).should.eql({
        backgroundColor: '#f5f4f4',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 15, 20).should.eql({
        backgroundColor: '#fce0e0',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 35, 40).should.eql({
        backgroundColor: '#f6c9d0',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 55, 60).should.eql({
        backgroundColor: '#f6a8a7',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 75, 80).should.eql({
        backgroundColor: '#f28081',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 95, 100).should.eql({
        backgroundColor: '#ef6f70',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 1', () => {
      getVisualTokenOIGBackground(15, 0, 0).should.eql({
        backgroundColor: '#f9dec7',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 15, 20).should.eql({
        backgroundColor: '#f9d3c3',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 35, 40).should.eql({
        backgroundColor: '#f3adad',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 55, 60).should.eql({
        backgroundColor: '#f39f8e',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 75, 80).should.eql({
        backgroundColor: '#f18075',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 95, 100).should.eql({
        backgroundColor: '#ed6154',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 2', () => {
      getVisualTokenOIGBackground(35, 0, 0).should.eql({
        backgroundColor: '#f5c5a2',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 15, 20).should.eql({
        backgroundColor: '#f3b094',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 35, 40).should.eql({
        backgroundColor: '#f4a298',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 55, 60).should.eql({
        backgroundColor: '#f28687',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 75, 80).should.eql({
        backgroundColor: '#ee6465',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 95, 100).should.eql({
        backgroundColor: '#e85050',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 3', () => {
      getVisualTokenOIGBackground(55, 0, 0).should.eql({
        backgroundColor: '#f9946b',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 15, 20).should.eql({
        backgroundColor: '#f88567',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 35, 40).should.eql({
        backgroundColor: '#ed7467',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 55, 60).should.eql({
        backgroundColor: '#fd5e4c',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 75, 80).should.eql({
        backgroundColor: '#ff5050',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 95, 100).should.eql({
        backgroundColor: '#ec3435',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 4', () => {
      getVisualTokenOIGBackground(75, 0, 0).should.eql({
        backgroundColor: '#fb7045',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 15, 20).should.eql({
        backgroundColor: '#fc5d2c',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 35, 40).should.eql({
        backgroundColor: '#f35c17',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 55, 60).should.eql({
        backgroundColor: '#f34339',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 75, 80).should.eql({
        backgroundColor: '#f32a29',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });

      getVisualTokenOIGBackground(75, 95, 100).should.eql({
        backgroundColor: '#dc2c30',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 5', () => {
      getVisualTokenOIGBackground(95, 0, 0).should.eql({
        backgroundColor: '#f95125',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 15, 20).should.eql({
        backgroundColor: '#ff4f13',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 35, 40).should.eql({
        backgroundColor: '#f64016',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 55, 60).should.eql({
        backgroundColor: '#f42d1f',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 75, 80).should.eql({
        backgroundColor: '#f0201e',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });

      getVisualTokenOIGBackground(95, 95, 100).should.eql({
        backgroundColor: '#f52524',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });
    });

    it('should return extra blue background colors when first percentile is 0', () => {
      getVisualTokenOIGBackground(0, 0, 0).should.eql({
        backgroundColor: '#f5f4f4',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 15, 0).should.eql({
        backgroundColor: '#dde6f7',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 35, 0).should.eql({
        backgroundColor: '#d1ddf1',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 55, 0).should.eql({
        backgroundColor: '#bdc7ec',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 75, 0).should.eql({
        backgroundColor: '#8498d8',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 95, 0).should.eql({
        backgroundColor: '#405ec3',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });
  });

  describe('hasEnoughRadarChartData', () => {
    it('should return false if items is empty', () => {
      hasEnoughRadarChartData([]).should.be.false();
      hasEnoughRadarChartData(undefined).should.be.false();
    });

    it('should return false if some item value is missing', () => {
      hasEnoughRadarChartData([
        { axis: 'Use of Force Reports', value: 80 },
        { axis: 'Civilian Complaints', value: 70 },
        { axis: 'Internal Complaints', value: NaN },
      ]).should.be.false();
    });

    it('should return true if all item values is OK', () => {
      hasEnoughRadarChartData([
        { axis: 'Use of Force Reports', value: 80 },
        { axis: 'Civilian Complaints', value: 70 },
        { axis: 'Internal Complaints', value: 10 },
      ]).should.be.true();
    });
  });
});
