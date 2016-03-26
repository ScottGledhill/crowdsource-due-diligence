doesItSuck.controller('specificSearchController',['searchFactory', function(searchFactory){


  self.makeMultiDaySearch = function(searchTerm){
    self.searchFactory = new searchFactory(searchTerm);
    self.weekResults.unshift(self.searchFactory);
    self.setResultStatus();
  };
}]);
