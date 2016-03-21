doesItSuck.controller('searchController',['searchFactory', function(searchFactory){
  var self = this;
  self.searchTerm = "";
  self.searchFactory = new searchFactory();

  self.resultReady = false;

  self.isResultReady = function(){
    return self.resultReady;
  };

  self.toggleResultStatus = function() {
    self.resultReady = !self.resultReady;
  };

}])
