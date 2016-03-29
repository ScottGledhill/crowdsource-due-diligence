doesItSuck.controller('compareController', ['searchFactory', function(searchFactory){

var self = this;
self.results = [];

  self.makeSearch = function(searchTermOne, searchTermTwo){
    var comparison = [];
    self.searchTerms = [{search_term: searchTermOne}, {search_term: searchTermTwo}];
    self.searchTerms.forEach(function(searchTerm){
      searchFactory.query(searchTerm).then(function(response){
        response.data.loaded = true;
        comparison.unshift(response.data);
      });
    });
    self.results.unshift(comparison);
  };

  self.evaluateSearch = function (search) {
    if( search.positive > 1.5 * search.negative) {
      return RESULT_TERMS.positive;
    } else if( search.negative > 1.5 * search.positive) {
      return RESULT_TERMS.negative;
    } else {
      return RESULT_TERMS.neutral;
    }
  };

  self.calcBgCol = function (search) {
    var evaluated = self.evaluateSearch(search);
    return COLORCHOICE[evaluated];
  };

  self.outcome = function(compArray){
    var firstArray = compArray[0].positive / compArray[0].negative;
    var secondArray =  compArray[1].positive / compArray[1].negative;
    if (firstArray > secondArray){
      return compArray[1].search_term + ' Sucks';
    } else {
      return compArray[0].search_term + ' Sucks';
    }
  };


    var COLORCHOICE = {'SUCKS': 'red', 'DOESN\'T SUCK': 'green', 'MEH': 'yellow'};
    var RESULT_TERMS = {'positive': 'DOESN\'T SUCK', 'negative': 'SUCKS', 'neutral': 'MEH'};



}]);
