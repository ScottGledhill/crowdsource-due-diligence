doesItSuck.controller('trendsController',['sentimentTrendsFactory', function(sentimentTrendsFactory){
  // pass in chartFactory
  var self = this;
  self.results = [];
  // results will be an array of hashes - each result will have data and a chartFactory

  getResults();

  function getResults(){
    var promiseArr = sentimentTrendsFactory.getRetVal();
    promiseArr.forEach(function(promise){
      promise.then(function(response){
        // start new
        var resultObj = {};
        resultObj.data = response.data;
        // need some parsing to put data into angular-chart format
        // how best to pass parsed data into chartFactory? On initialization?
        var parsedData = self.parseData(response.data);
        resultObj.chartFactory = new chartFactory(parsedData);
        self.results.unshift(resultObj);
        // end new
        // old:
        // self.results.unshift(response.data);
      });
    });

    self.parsedData = function (data) {
      // magic
    };
  }

}]);
