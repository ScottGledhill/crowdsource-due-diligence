doesItSuck.factory('searchFactory', ['$http', function($http) {

  return {
    getSentimentResults : function(searchParams){
      var queryUrl = 'http://localhost:3000/search';
      var headers = { headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }};
      return $http.post(queryUrl, searchParams, headers);
      }
  }

}]);
