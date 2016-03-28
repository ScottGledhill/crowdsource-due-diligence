doesItSuck.controller('trendsController',['sentimentTrendsFactory',  function(sentimentTrendsFactory){

  var self = this;

  self.data = [[],[],[]];

  function resetData() {
    self.data = [[],[],[]];
  }

  self.colors = ['#02D606', '#FFC400', '#FF2626'];
  self.series = ['Positive', 'Neutral', 'Negative'];
  self.labels = ['7 days ago', '4 days ago', 'Yesterday'];

  function getResults(){
    resetData();
    var promiseArr = sentimentTrendsFactory.getResults();
    var resultArr = [];
    promiseArr.forEach(function(response){
      if (self.searchTerm === undefined){self.searchTerm = response.searchTerm;}
      var promise = response.result;
      promise.then(function(response){resultArr.unshift(response.data);})
      .finally(function() {
        if( resultArr.length === 3 ) {
          resultArr.sort(function(a,b) {
              return new Date(a.date_from) - new Date(b.date_from);
          });
          resultArr.forEach(function(result) {
            self.data[0].push(result.positive);
            self.data[1].push(result.neutral);
            self.data[2].push(result.negative);
          });
        }
      });
    });
  }

  getResults();

}]);
