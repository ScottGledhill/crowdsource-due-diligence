doesItSuck.controller('searchController',['$route', 'searchFactory','sentimentTrendsFactory', function($route, searchFactory, sentimentTrendsFactory){
  var self = this;
  self.searches = [];
  self.resultReady = false;
  self.bg = '{"background-color": "red"}';

  self.makeSearch = function(searchTerm){
    searchFactory.query(searchTerm).then(function(response){
      response.data.loaded = true;
      self.searches.unshift(response.data);
    });
  };

  self.setSearchTerm = function(searchTerm) {
    sentimentTrendsFactory.setSearchTerm(searchTerm);
  };

  self.passResults = function(searchResult){
    sentimentTrendsFactory.setSearchResult(searchResult);
  };

  self.evaluateSearch = function (search) {
    if( search.positive > 1.5 * search.negative) {
      return RESULT_TERMS.positive;
    } else if( search.negative > 1.5 * search.positive) {
      return RESULT_TERMS.negative;
    } else {
      return RESULT_TERMS.neutral;
    }
  };

  self.calcBgCol = function (search) {
    var evaluated = self.evaluateSearch(search);
    return COLORCHOICE[evaluated];
  };

  var COLORCHOICE = {'SUCKS': 'red', 'DOESN\'T SUCK': 'green', 'MEH': 'yellow'};
  var RESULT_TERMS = {'positive': 'DOESN\'T SUCK', 'negative': 'SUCKS', 'neutral': 'MEH'};

}]);
