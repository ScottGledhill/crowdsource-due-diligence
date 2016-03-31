doesItSuck.factory('resultsFactory', ['$q', function($q) {
  var data = [[],[],[]];
  var methods = {
    outcome:outcome,
    loserName: loserName,
    getResults: getResults,
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

   function resetData() {
     data = [[],[],[]];
   }

   function addChartData(resultArr){
     resultArr.forEach(function(result) {
       data[0].push(result.positive);
       data[1].push(result.neutral);
       data[2].push(result.negative);
     });
   }

   function extractResults(promiseArr){
     var resultArr = [];
     return $q.all(promiseArr).then(function(result){
      result.forEach(function(response){
          resultArr.unshift(response.data);
        });
      addChartData(resultArr);
      return data;
      });
   }

   function getResults(promiseArr){
     resetData();
     return extractResults(promiseArr);
   }
}]);
