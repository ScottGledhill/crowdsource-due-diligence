doesItSuck.controller('trendsController',['sentimentTrendsFactory', 'presentationFactory', 'resultsFactory',  function(sentimentTrendsFactory, presentationFactory, resultsFactory){

  var self = this;
  self.chart = presentationFactory.getChart();

  function loadData(){
    if (sentimentTrendsFactory.getSearchTerm() !== undefined){
      self.searchTerm = sentimentTrendsFactory.getSearchTerm();
      var promiseArr = sentimentTrendsFactory.getResults();
      var promise = resultsFactory.getResults(promiseArr);
      promise.then(function(response){
        self.chart.data = response;
      });
    }else{
      self.searchTerm = 'No search term given';
    }
  }
  loadData();

}]);
