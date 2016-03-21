doesItSuck.controller('searchController', function(){
  var self = this;
  self.searchTerm = "";

  self.resultReady = false;

  self.isResultReady = function(){
    return self.resultReady;
  };

  self.toggleResultStatus = function() {
    self.resultReady = !self.resultReady;
  };

})
