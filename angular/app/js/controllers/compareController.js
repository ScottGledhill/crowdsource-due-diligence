doesItSuck.controller('compareController', ['searchFactory', '$q', function(searchFactory, $q){

var self = this;
self.results = [];
self.ready = false;

  self.makeSearch = function(searchTermOne, searchTermTwo){
  var comparison = [];
  var promiseArray = [];
  self.searchTerms = [{search_term: searchTermOne}, {search_term: searchTermTwo}];
  self.searchTerms.forEach(function(searchTerm){
    promiseArray.push(searchFactory.query(searchTerm).then(function(response){
      comparison.unshift(response.data);
    }));
  });
  $q.all(promiseArray).then(function(){
    self.ready = true;
    self.results.unshift(comparison);
  });



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
      compArray[0].outcome = 'DOESN\'T SUCK';
      compArray[1].outcome = 'SUCKS';
      return compArray[1].search_term + ' Sucks';
    } else {
      compArray[0].outcome = 'SUCKS';
      compArray[1].outcome = 'DOESN\'T SUCK';
      return compArray[0].search_term + ' Sucks';
    }
  };

  self.calcBgCol2 = function(search){
    return COLORCHOICE[search.outcome];
  };


    var COLORCHOICE = {'SUCKS': 'red', 'DOESN\'T SUCK': 'green', 'MEH': 'yellow'};
    var RESULT_TERMS = {'positive': 'DOESN\'T SUCK', 'negative': 'SUCKS', 'neutral': 'MEH'};

}]);
