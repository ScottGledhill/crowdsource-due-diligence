
doesItSuck.controller('searchController',['$scope', '$route','searchFactory','sentimentTrendsFactory', 'localStorageService', function($scope, $route, searchFactory, sentimentTrendsFactory, localStorageService){
  var self = this;
  self.searches = [];
  self.resultReady = false;
  self.bg = '{"background-color": "red"}';

  var STORAGE_KEY = 'resultHistory';

  self.getHistory = function(resultHistory){
    var lskeys = localStorageService.keys();
    self.searches = lskeys.length < 1 ? [] : localStorageService.get(resultHistory);
  };

  self.setHistory = function(key, value){
    localStorageService.set(key, value);
  };

  self.delete = function(search){
    var index = self.searches.indexOf(search);
    if (index > -1) self.searches.splice(index,1);
    self.setHistory(STORAGE_KEY,self.searches);
  };

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

  self.getHistory(STORAGE_KEY);

  $scope.$on('$routeChangeStart', function(event,next,prev){
    self.setHistory(STORAGE_KEY,self.searches);
  });




  var COLORCHOICE = {'SUCKS': 'red', 'DOESN\'T SUCK': 'green', 'MEH': 'yellow'};
  var RESULT_TERMS = {'positive': 'DOESN\'T SUCK', 'negative': 'SUCKS', 'neutral': 'MEH'};

}]);
