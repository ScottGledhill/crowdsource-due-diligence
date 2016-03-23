doesItSuck.controller('searchController',['searchFactory', function(searchFactory){
  var self = this;
  self.searches = [];
  self.resultReady = false;


  self.makeSearch = function(searchTerm){
    self.searchFactory = new searchFactory(searchTerm);
    self.searches.push(self.searchFactory);
    self.setResultStatus();
  };

  self.isResultReady = function(){
    return self.resultReady;
  };

  self.setResultStatus = function() {
    self.resultReady = true;
  };

}]);
