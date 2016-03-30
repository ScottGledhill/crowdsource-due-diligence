doesItSuck.controller('trendsController',['sentimentTrendsFactory', 'presentationFactory',  function(sentimentTrendsFactory, presentationFactory){

  var self = this;
  self.chart = presentationFactory.getChart();
  self.chart.data = [[],[],[]];

  function resetData() {
    self.chart.data = [[],[],[]];
  }

  function loadData(){
    if (sentimentTrendsFactory.getSearchTerm() !== undefined){
      getResults();
    }else{
      self.searchTerm = 'No search term given';
    }
  }

  // TODO: //getResults should be refactored, and more of the logic moved elsewhere

  function getResults(){
    resetData();
    var promiseArr = sentimentTrendsFactory.getResults();
    var resultArr = [];
    promiseArr.forEach(function(response){
      self.searchTerm = response.searchTerm;
      var promise = response.result;
      promise.then(function(response){
        resultArr.unshift(response.data);})
      .finally(function() {
        if( resultArr.length === 3 ) {
          resultArr.sort(function(a,b) {
              return new Date(a.date_from) - new Date(b.date_from);
          });
          resultArr.forEach(function(result) {
            self.chart.data[0].push(result.positive);
            self.chart.data[1].push(result.neutral);
            self.chart.data[2].push(result.negative);
          });
        }
      });
    });
  }

  loadData();

}]);
