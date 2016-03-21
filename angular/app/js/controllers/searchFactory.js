doesItSuck.factory('searchFactory', ['$http', function($http) {
  var searchFactory = function () {};

  searchFactory.prototype.search = function(searchTerm) {
    var queryUrl = 'localhost:3000/twitter/create';
    var headers = { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }};
    return $http.post(queryUrl, searchTerm, headers);
  };

  return searchFactory;
}]);
