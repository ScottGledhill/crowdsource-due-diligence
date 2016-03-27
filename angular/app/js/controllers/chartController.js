doesItSuck.controller('chartController',[function(){

  // needs to be turned into a factory and added to every search

  var self = this;

  self.labels = ['7 days ago', '4 days ago', 'Yesterday'];

  self.series = ['Positive', 'Neutral', 'Negative'];

  self.data = [
                [1, 2, 3],
                [2, 4, 1],
                [5, 3, 2]
              ];


}]);
