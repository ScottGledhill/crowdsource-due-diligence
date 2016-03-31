doesItSuck.factory('sentimentTrendsFactory', sentimentTrendsFactory);

  sentimentTrendsFactory.$inject = ['searchFactory', 'datesFactory', 'resultsFactory', 'presentationFactory', '$q'];

  function sentimentTrendsFactory(searchFactory, datesFactory, resultsFactory, presentationFactory, $q) {

    var searchTerm;
    var LASTWEEKDATES = [7,6, 4,3, 1,0];
    var searchPromises = [];
    var ready = false;
    var resultArray =  [];

    var service = {
      setSearchTerm: setSearchTerm,
      getSearchTerm: getSearchTerm,
      getResults: getResults,
      makeParams: makeParams,
      searchPromises: searchPromises,
      LASTWEEKDATES: LASTWEEKDATES,
      makeSearch: makeSearch
    };
    return service;

    function resetPromises(){
      searchPromises = [];
    }

    function makeSearch(searchTermOne, searchTermTwo){
      var comparison = [];
      var searchTerms = [{search_term: searchTermOne}, {search_term: searchTermTwo}];
      var promiseArray = searchTerms.map(function(searchTerm){
        return searchFactory.query(searchTerm).then(function(response){
          comparison.unshift(response.data);
        });}
      );
      $q.all(promiseArray).then(function(){
        resultsFactory.outcome(comparison[0],comparison[1]);
        var result = {};
        result.verbalOutcome = presentationFactory.getOutcome(comparison);
        result.message = result.verbalOutcome + "... " + presentationFactory.snarkyComment() + ".";
        result.comparison = comparison;
        result.operator = presentationFactory.operator(comparison);
        resultArray.unshift(result);
      });
      return resultArray;
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

    function callFactory(listParams){
      listParams.forEach(function(params){
        searchPromises.push(searchFactory.query(params));
      });
    }

    function makeParams(){
      var listParams = [];
      var params;
      var dates = datesFactory.getTwitterDates(LASTWEEKDATES);
      for (var i= 0; i<(dates.length); i += 2){
        params = {search_term: getSearchTerm()};
        params.date_from = dates[i];
        params.date_till = dates[i+1];
        listParams.push(params);
      }
      return listParams;
    }
}
