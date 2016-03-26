doesItSuck.factory('searchFactory', ['$http', function($http) {
  var searchFactory = function (searchTerm) {
    var self = this;
    var queryUrl = 'https://does-it-suck-rails.herokuapp.com/search';
    var headers = { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }};
    var searchParams = {search_term: searchTerm};
    $http.post(queryUrl, searchParams, headers).then(function(response){
      response.data.loaded = true;
      angular.extend(self,response.data);
    });
  };

  return searchFactory;
}]);
