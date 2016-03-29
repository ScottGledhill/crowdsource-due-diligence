doesItSuck.controller('compareController', ['searchFactory', function(searchFactory){

var self = this;
self.results = [];

  self.makeSearch = function(searchTermOne, searchTermTwo){
    self.searchTerms = [{search_term: searchTermOne}, {search_term: searchTermTwo}];
    self.searchTerms.forEach(function(searchTerm){
      searchFactory.query(searchTerm).then(function(response){
        self.results.unshift(response.data);
      });
    })
  };



}]);
