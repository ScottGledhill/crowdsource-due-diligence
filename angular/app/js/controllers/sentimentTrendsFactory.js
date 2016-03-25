doesItSuck.factory('sentimentTrendsFactory', ['$http', 'searchFactory', function($http,searchFactory) {

  var searchParams = {};

  var searchResults = {
    params: searchParams;

  }

  return searchResults;

  function setSearchTerm(searchTerm){
    searchParams.searchTerm = searchTerm;
  };

  }


}]);
