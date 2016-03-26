doesItSuck.controller('searchController',['searchFactory','sentimentTrendsFactory', function(searchFactory, sentimentTrendsFactory){
  var self = this;
  self.searches = [];
  self.resultReady = false;


  self.makeSearch = function(searchTerm){
    searchFactory.query(searchTerm).then(function(response){
      self.searches.unshift(response.data);
    });
    self.setResultStatus();
  };

  self.isResultReady = function(){
    return self.resultReady;
  };

  self.setResultStatus = function() {
    self.resultReady = true;
  };

  self.setSearchTerm = function(searchTerm) {
    sentimentTrendsFactory.setSearchTerm(searchTerm);
  }



}]);
