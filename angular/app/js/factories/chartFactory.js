doesItSuck.factory('chartFactory',[function(){

  chartFactory = function(data) {
    this.data = data;
    this.colors = ['#02D606', '#FFC400', '#FF2626'];
    this.series = ['Positive', 'Neutral', 'Negative'];
    this.labels = ['7 days ago', '4 days ago', 'Yesterday'];
  };

  return chartFactory;

}]);
