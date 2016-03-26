doesItSuck.factory('sentimentTrendsFactory', ['$http', 'searchFactory', function($http,searchFactory) {

  var searchTerm = '';
  var DATERANGE = [7,6, 4,3, 1,0];
  var retVal = [];

  var results = {
    returnResults: returnResults,
    setSearchTerm: setSearchTerm,
    getRetVal: getRetVal
  }
  return results;

  function getRetVal(){
    returnResults();
    return retVal;
  };

  function setSearchTerm(searchInput){
    searchTerm = searchInput;
  };

  function getSearchTerm(){
    return searchTerm;
  }

  function returnResults(){
    var listParams = makeParams();
    listParams.forEach(function(params){
      retVal.unshift(searchFactory.query(params));
      });
  };

    function makeParams(){
      var listParams = []
      var params;
      var dates = getDates(DATERANGE);
      for (var i= 0; i<(dates.length-1); i += 2){
        params = {search_term: getSearchTerm()};
        params.date_from = dates[i];
        params.date_till = dates[i+1];
        listParams.push(params)
      }
      return listParams;

    }


    function getDates(dateRange){
      var today = new Date();
      var dates = [];
      var newDay = new Date();
      var dd, mm, yyyy;
      for (var i=0; i<dateRange.length; i++){
        newDay.setDate(today.getDate() - dateRange[i])
        dd = newDay.getDate();
        mm = newDay.getMonth()+1; //January is 0!
        yyyy = newDay.getFullYear();
        if(dd<10) { dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        dates.push(yyyy+'-'+mm+'-'+dd)
      }
      return dates;
    }


}]);
