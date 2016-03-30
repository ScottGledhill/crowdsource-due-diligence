
doesItSuck.controller('searchController',['$scope', '$route','searchFactory','sentimentTrendsFactory', 'localStorageService', 'presentationFactory', function($scope, $route, searchFactory, sentimentTrendsFactory, localStorageService, presentationFactory){
  var self = this;
  self.searches = [];
  self.resultReady = false;
  self.presentationFactory = presentationFactory;
  self.sentimentTrendsFactory = sentimentTrendsFactory;

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
    if (index > -1) {self.searches.splice(index,1);}
    self.setHistory(STORAGE_KEY,self.searches);
  };

  self.makeSearch = function(searchTerm){
    searchFactory.query(searchTerm).then(function(response){
      response.data.loaded = true;
      self.searches.unshift(response.data);
    });
  };


  self.getHistory(STORAGE_KEY);

  $scope.$on('$routeChangeStart', function(event,next,prev){
    self.setHistory(STORAGE_KEY,self.searches);
  });

}]);
