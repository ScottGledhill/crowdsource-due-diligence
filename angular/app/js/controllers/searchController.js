
doesItSuck.controller('searchController',['$scope', '$route','searchFactory','sentimentTrendsFactory', 'storageFactory', 'presentationFactory', function($scope, $route, searchFactory, sentimentTrendsFactory, storageFactory, presentationFactory){
  var self = this;
  self.resultReady = false;
  self.presentationFactory = presentationFactory;
  self.sentimentTrendsFactory = sentimentTrendsFactory;
  var STORAGE_KEY = 'resultHistory';
  self.searches = storageFactory.getHistory(STORAGE_KEY);

  self.delete = function(search){
    var index = self.searches.indexOf(search);
    if (index > -1) self.searches.splice(index,1);
    storageFactory.setHistory(STORAGE_KEY,self.searches);
  };

  self.makeSearch = function(searchTerm){
    searchFactory.query(searchTerm).then(function(response){
      response.data.loaded = true;
      self.searches.unshift(response.data);
    });
  };

  $scope.$on('$routeChangeStart', function(event,next,prev){
    storageFactory.setHistory(STORAGE_KEY,self.searches);
  });
}]);
