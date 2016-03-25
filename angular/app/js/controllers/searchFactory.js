doesItSuck.factory('searchFactory', ['$http', function($http) {
  var searchFactory = function (searchParams) {
    var self = this;
    var queryUrl = 'http://localhost:3000/search';
    var headers = { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }};
    console.log(searchParams)
    $http.post(queryUrl, searchParams, headers).then(function(response){
      angular.extend(self,response.data);
    });
  };

  return searchFactory;
}]);
