describe('searchController', function() {

  beforeEach(module('DoesItSuck'));
  var ctrl;


  beforeEach(inject(function($controller){
     ctrl = $controller('searchController');
   }));


  describe('#setResultStatus', function() {

    it('starts with not showing the page', function() {
      expect(ctrl.isResultReady()).toEqual(false);
    });

    it('changes resultReady boolean', function() {
      ctrl.setResultStatus();
      expect(ctrl.isResultReady()).toEqual(true);
    });

  });

  describe('#evaluateSearch', function() {
    var searchMockNeg = {positive: 1, negative: 5, neutral: 3};
    var searchMockPos = {positive: 12, negative: 5, neutral: 3};
    var searchMockNeut = {positive: 6, negative: 5, neutral: 10};
    var searchMockEq = {positive: 5, negative: 5, neutral: 5};
    it('returns SUCKS if negative is greatest', function() {
      expect(ctrl.evaluateSearch(searchMockNeg)).toEqual('SUCKS');
    });
    it('returns DOESN\'T SUCK if positive is greatest', function() {
      expect(ctrl.evaluateSearch(searchMockPos)).toEqual('DOESN\'T SUCK');
    });
    it('returns MEH if neutral is greatest', function() {
      expect(ctrl.evaluateSearch(searchMockNeut)).toEqual('MEH');
    });
    it('returns MEH if all are equal', function() {
      expect(ctrl.evaluateSearch(searchMockEq)).toEqual('MEH');
    });
  });

  describe('calcBgCol', function() {
    var searchMockNeg = {positive: 1, negative: 5, neutral: 3};
    var searchMockPos = {positive: 12, negative: 5, neutral: 3};
    var searchMockNeut = {positive: 6, negative: 5, neutral: 10};
    var searchMockEq = {positive: 5, negative: 5, neutral: 5};
    it('sets col to red if SUCKS', function() {
      expect(ctrl.calcBgCol(searchMockNeg)).toEqual('red');
    });
  });

});
