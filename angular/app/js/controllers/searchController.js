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

  self.multiDaySearches = function(dates,searchTerm){
    for (var i= 0; i<(dates.length-1) ; i++ ){
      searchTerm.date_from = dates[i];
      searchTerm.date_till = dates[i+1];
      self.makeSearch(searchTerm);
    }
  }

}]);
