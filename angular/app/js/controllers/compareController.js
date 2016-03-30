doesItSuck.controller('compareController', ['searchFactory', '$q', function(searchFactory, $q){

var self = this;
self.results = [];
self.ready = false;

  self.makeSearch = function(searchTermOne, searchTermTwo){
  var comparison = [];
  var searchTerms = [{search_term: searchTermOne}, {search_term: searchTermTwo}];
  var promiseArray = searchTerms.map(function(searchTerm){
    return searchFactory.query(searchTerm).then(function(response){
      comparison.unshift(response.data);
    });}
  );
  $q.all(promiseArray).then(function(){
    self.ready = true;
    self.outcome(comparison[0],comparison[1]);
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



  self.outcome = function(compObject, compObjectTwo){
    compObject.score = compObject.positive / compObject.negative;
    compObjectTwo.score = compObjectTwo.positive / compObjectTwo.negative;
    compObject > compObjectTwo ? compObject.winner = true : compObjectTwo.winner = true;
  };


  self.loserName = function(comparison){
      if (comparison[0].winner){
         return comparison[1].search_term;
     }else{
       return comparison[0].search_term;
     }
   };

  self.calcBgCol2 = function(search){
     return (search.winner) ? COLORCHOICE['DOESN\'T SUCK'] : COLORCHOICE['SUCKS'];
     };

    var COLORCHOICE = {'SUCKS': 'red', 'DOESN\'T SUCK': 'green', 'MEH': 'yellow'};
    var RESULT_TERMS = {'positive': 'DOESN\'T SUCK', 'negative': 'SUCKS', 'neutral': 'MEH'};

}]);
