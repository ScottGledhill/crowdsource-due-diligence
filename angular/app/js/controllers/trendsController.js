doesItSuck.controller('trendsController',['sentimentTrendsFactory', 'chartFactory',  function(sentimentTrendsFactory, chartFactory){
  // pass in chartFactory
  var self = this;
  self.searchTerm = undefined;

  self.data = [[],[],[]];

  this.colors = ['#02D606', '#FFC400', '#FF2626'];
  this.series = ['Positive', 'Neutral', 'Negative'];
  this.labels = ['7 days ago', '4 days ago', 'Yesterday'];


  getResults();

  function resetData() {
    self.data = [[],[],[]];
  }

  function getResults(){
    resetData();
    var promiseArr = sentimentTrendsFactory.getRetVal();
    promiseArr.forEach(function(promise){
      promise.then(function(response){
        if (self.searchTerm === undefined){self.searchTerm = response.data.search_term;}
        self.data[0].unshift(response.data.positive);
        self.data[1].unshift(response.data.neutral);
        self.data[2].unshift(response.data.negative);
        console.log(self.data);
      });
    });
  }

}]);
