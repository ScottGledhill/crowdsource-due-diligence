doesItSuck.controller('searchController',['searchFactory', function(searchFactory){
  var self = this;
  self.searches = [];
  self.resultReady = false;
  self.bg = '{"background-color": "red"}';


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

  self.evaluateSearch = function (search) {
    if( search.positive > search.negative && search.positive > search.neutral) {
      return 'DOESN\'T SUCK';
    } else if( search.negative > search.positive && search.negative > search.neutral) {
      return 'SUCKS';
    } else {
      return 'MEH';
    }
  };

  self.calcBgCol = function (search) {
    switch(self.evaluateSearch(search)) {
      case 'SUCKS':
        return 'red';
      case 'DOESN\'T SUCK':
        return 'green';
      case 'MEH':
        return 'yellow';
    }
  };

}]);
