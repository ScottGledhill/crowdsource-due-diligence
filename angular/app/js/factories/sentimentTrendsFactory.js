doesItSuck.factory('sentimentTrendsFactory', ['searchFactory', 'datesFactory', function(searchFactory, datesFactory) {

  var searchTerm;
  var searchResult;
  var LASTWEEKDATES = [7,6, 4,3, 1,0];
  var searchPromises = [];

  var results = {
    setSearchTerm: setSearchTerm,
    getSearchTerm: getSearchTerm,
    getResults: getResults,
    makeParams: makeParams,
    searchPromises: searchPromises,
    LASTWEEKDATES: LASTWEEKDATES,
    setSearchResult: setSearchResult,
    getSearchResult: getSearchResult
  };

  return results;

  function resetPromises(){
    searchPromises = [];
  }

  function getResults(){
    resetPromises();
    var listParams = makeParams();
    callFactory(listParams);
    return searchPromises;
  }

  function setSearchTerm(searchInput){
    searchTerm = searchInput;
  }

  function getSearchTerm(){
    return searchTerm;
  }

  function setSearchResult(input){
    searchResult = input;
  }

  function getSearchResult(){
    return searchResult;
  }

  function callFactory(listParams){
    listParams.forEach(function(params){
      var result = {};
      result.searchTerm = params.search_term;
      result.result = searchFactory.query(params);
      searchPromises.unshift(result);
      });
  }

    function makeParams(){
      var listParams = [];
      var params = '';
      var dates = datesFactory.getTwitterDates(LASTWEEKDATES);
      for (var i= 0; i<(dates.length); i += 2){
        params = {search_term: getSearchTerm()};
        params.date_from = dates[i];
        params.date_till = dates[i+1];
        listParams.push(params);
      }
      return listParams;
    }

}]);
