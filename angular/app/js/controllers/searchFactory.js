doesItSuck.factory('searchFactory', ['$http', function($http) {
  var searchFactory = function (searchParams) {
    console.log('searchfactory')
    console.log(searchParams)
    var self = this;
    var queryUrl = 'http://localhost:3000/search';
    var headers = { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }};
    $http.post(queryUrl, searchParams, headers).then(function(response){
      angular.extend(self,response.data);
    });
  };

  return searchFactory;
}]);
