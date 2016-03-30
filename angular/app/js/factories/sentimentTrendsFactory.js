doesItSuck.factory('sentimentTrendsFactory', ['searchFactory', 'datesFactory', 'resultsFactory', '$q', function(searchFactory, datesFactory, resultsFactory, $q) {

  var searchTerm;
  var searchResult;
  var LASTWEEKDATES = [7,6, 4,3, 1,0];
  var searchPromises = [];
  var ready = false;

  var results = {
    isReady: isReady,
    setSearchTerm: setSearchTerm,
    getSearchTerm: getSearchTerm,
    getResults: getResults,
    makeParams: makeParams,
    searchPromises: searchPromises,
    LASTWEEKDATES: LASTWEEKDATES,
    setSearchResult: setSearchResult,
    getSearchResult: getSearchResult,
    makeSearch: makeSearch
  };
  return results;

  function resetPromises(){
    searchPromises = [];
  }

  function isReady(){
    return ready;
  }

  function makeSearch(searchTermOne, searchTermTwo){
    var resultArray =  []
    var comparison = [];
    var searchTerms = [{search_term: searchTermOne}, {search_term: searchTermTwo}];
    var promiseArray = searchTerms.map(function(searchTerm){
      return searchFactory.query(searchTerm).then(function(response){
        comparison.unshift(response.data);
      });}
    );
    $q.all(promiseArray).then(function(){
      ready = true;
      resultsFactory.outcome(comparison[0],comparison[1]);
      resultArray.unshift(comparison);
    });
    return resultArray;
  };

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
    // console.log('sent searchterm')
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
      // var result = {};
      // result.searchTerm = params.search_term;
      // result.result = searchFactory.query(params);
      // searchPromises.unshift(result);
      searchPromises.unshift(searchFactory.query(params));
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
