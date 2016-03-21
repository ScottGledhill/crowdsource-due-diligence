doesItSuck.factory('searchFactory', ['$http', function($http) {
  var searchFactory = function () {
    this.searchResult = {};
  };

  searchFactory.prototype.search = function(searchTerm) {
    var self = this;
    var queryUrl = 'localhost:3000/twitter/create';
    var headers = { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }};
    $http.post(queryUrl, searchTerm, headers).then(function(response){
      self.searchResult = response.data;
    });
  };


  return searchFactory;
}]);
