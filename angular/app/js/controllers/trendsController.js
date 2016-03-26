doesItSuck.controller('trendsController',['sentimentTrendsFactory', function(sentimentTrendsFactory){
  var self = this;
  self.results = [];

  getResults();

  function getResults(){
    var promiseArr = sentimentTrendsFactory.getRetVal();
    promiseArr.forEach(function(promise){
      promise.then(function(response){
        self.results.unshift(response.data);
      });
    });
  };

}]);
