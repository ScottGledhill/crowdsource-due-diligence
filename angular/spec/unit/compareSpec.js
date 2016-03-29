describe('compareController', function() {
  var searchFactoryMock, ctrl, MOCK_MESSAGES, MOCK_SEARCH_RESULTS;

  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($controller) {

    searchFactoryMock = {getSearchResult: function(){} };
      ctrl = $controller('comparecController');
    }));

  describe('#getCompareResults', function(){

    it('#makeSearch', function(){
      var searchTermOne = 'iphone6';
      var searchTermTwo = 'iphone5';
      ctrl.makeSearch(searchTermOne, searchTermTwo);
      expect(ctrl.searchTerms).toContain('iphone6');
    });
  });
});
