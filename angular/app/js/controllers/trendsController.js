doesItSuck.controller('trendsController',['sentimentTrendsFactory', 'presentationFactory', 'resultsFactory',  function(sentimentTrendsFactory, presentationFactory, resultsFactory){

  var self = this;
  self.chart = presentationFactory.getChart();
  // self.chart.data = [[],[],[]];

  function loadData(){
    if (sentimentTrendsFactory.getSearchTerm() !== undefined){
      var promiseArr = sentimentTrendsFactory.getResults();
      self.chart.data = resultsFactory.getResults(promiseArr);
      console.log(self.chart);
      console.log(self.chart.data);
    }else{
      self.searchTerm = 'No search term given';
    }
  }
  loadData();

}]);
