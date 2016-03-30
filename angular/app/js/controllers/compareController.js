doesItSuck.controller('compareController', ['searchFactory', 'presentationFactory', '$q', function(searchFactory, presentationFactory, $q){

var self = this;
self.results = [];
self.ready = false;
self.presentationFactory = presentationFactory;

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

}]);
