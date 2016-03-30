doesItSuck.factory('resultsFactory', ['$q', function($q) {
  var data = [[],[],[]]
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
    //  console.log('called add chart data')
    //  console.log(resultArr);
     resultArr.forEach(function(result) {
       data[0].push(result.positive);
       data[1].push(result.neutral);
       data[2].push(result.negative);
     });
   };

   function extractResults(promiseArr){
     var resultArr = [];
     var score = [];
    //  console.log(promiseArr);
     resultArr = promiseArr.map(function(promise){
      //  console.log(promise);
       return promise.then(function(response){
        //  console.log(response)
         score.unshift(response.data);
       })
     });
     return $q.all(promiseArr).then(function(){
      //  console.log(score);
       addChartData(score);
       console.log(data);
       return data;
     });
   }

   function getResults(promiseArr){
     resetData();
     var test = extractResults(promiseArr);
     console.log(test)
     return test;
   }
}]);
