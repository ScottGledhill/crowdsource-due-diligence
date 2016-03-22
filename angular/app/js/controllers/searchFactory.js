doesItSuck.factory('searchFactory', ['$http', function($http) {
  var searchFactory = function (searchTerm) {
    this.initialize = function(){
    var self = this;
    var queryUrl = 'localhost:3000/searches';
    var headers = { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }};
    $http.post(queryUrl, searchTerm, headers).then(function(response){
      angular.extend(self,response.data);
    });
  };

  this.initialize();
};

  return searchFactory;
}]);
