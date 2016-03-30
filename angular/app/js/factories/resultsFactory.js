doesItSuck.factory('resultsFactory', [function() {

  var methods = {
    outcome:outcome,
    loserName: loserName
  };
  return methods;

  function outcome(compObject, compObjectTwo){
    compObject.score = compObject.positive / compObject.negative;
    compObjectTwo.score = compObjectTwo.positive / compObjectTwo.negative;
    compObject.score > compObjectTwo.score ? compObject.winner = true : compObjectTwo.winner = true;
  }

  function loserName(comparison){
      if (comparison[0].winner){
         return comparison[1].search_term;
     }else{
       return comparison[0].search_term;
     }
   }
}]);
