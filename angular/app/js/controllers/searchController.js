doesItSuck.controller('searchController',['searchFactory','sentimentTrendsFactory', function(searchFactory, sentimentTrendsFactory){
  var self = this;
  self.searches = [];
  self.resultReady = false;
  self.bg = '{"background-color": "red"}';


  self.makeSearch = function(searchTerm){
    searchFactory.query(searchTerm).then(function(response){
      response.data.loaded = true;
      self.searches.unshift(response.data);
    });

  };

  self.evaluateSearch = function (search) {
    if( search.positive > 1.5 * search.negative) {
      return 'DOESN\'T SUCK';
    } else if( search.negative > 1.5 * search.positive) {
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

  self.setSearchTerm = function(searchTerm) {
    sentimentTrendsFactory.setSearchTerm(searchTerm);
  }



}]);
