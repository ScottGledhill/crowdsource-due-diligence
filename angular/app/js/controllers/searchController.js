doesItSuck.controller('searchController', searchController);

searchController.$inject = ['$scope', '$route','searchFactory','sentimentTrendsFactory', 'storageFactory', 'presentationFactory'];

function searchController($scope, $route, searchFactory, sentimentTrendsFactory, storageFactory, presentationFactory){
  var self = this;
  var STORAGE_KEY = 'resultHistory';
  self.presentationFactory = presentationFactory;
  self.sentimentTrendsFactory = sentimentTrendsFactory;
  self.storageFactory = storageFactory;
  self.searches = self.storageFactory.getHistory(STORAGE_KEY);
  self.deleteResult = deleteResult;
  self.makeSearch = makeSearch;

  function deleteResult(search){
    var index = self.searches.indexOf(search);
    if (index > -1) self.searches.splice(index,1);
    self.storageFactory.setHistory(STORAGE_KEY,self.searches);
  }

  function makeSearch(searchTerm){
    searchFactory.query(searchTerm).then(function(response){
      response.data.loaded = true;
      self.searches.unshift(response.data);
    });
  }

  $scope.$on('$routeChangeStart', function(event,next,prev){
    self.storageFactory.setHistory(STORAGE_KEY,self.searches);
  });
}
