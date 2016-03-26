doesItSuck.controller('trendsController',['sentimentTrendsFactory', function(sentimentTrendsFactory){
  var self = this;
  self.results = [];

  function getResults(){
    var promiseArr = sentimentTrendsFactory.getResults();
    promiseArr.forEach(function(promise){
      promise.then(function(response){
        self.results.unshift(response.data);
      });
    });
  };

  getResults();

}]);
