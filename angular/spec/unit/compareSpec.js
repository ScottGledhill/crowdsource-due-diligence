describe('dataController', function() {
  var searchFactoryMock, ctrl, MOCK_MESSAGES, MOCK_SEARCH_RESULTS;

  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($controller) {

    searchFactory = {getSearchResult: function(){} };
    spyOn(searchFactoryMock,'getSearchResult').and.returnValue(MOCK_SEARCH_RESULTS);
    ctrl = $controller('dataController', {
      searchFactory: searchFactoryMock});
  }));

  describe('#getCompareResults', function(){

    it('#makeSearch', function(){
      var searchTermOne = ('iphone6');
      var searchTermTwo = ('iphone5');
      ctrl.makeSearch(searchTermOne, searchTermTwo);
      expect(ctrl.searchTerms).toContain('iphone6');
    });
  });
});
