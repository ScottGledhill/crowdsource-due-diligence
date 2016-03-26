doesItSuck.controller('searchController',['searchFactory', function(searchFactory){
  var self = this;
  self.searches = [];
  self.resultReady = false;
  self.bg = '{"background-color": "red"}';


  self.makeSearch = function(searchTerm){
    self.searchFactory = new searchFactory(searchTerm);
    self.searches.push(self.searchFactory);
  };

  self.evaluateSearch = function (search) {
    if( search.positive > 1.5 * search.negative) {
      return 'DOESN\'T SUCK';
    } else if( search.negative > 1.33 * search.positive) {
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
