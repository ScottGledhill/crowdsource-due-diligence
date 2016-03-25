doesItSuck.controller('searchController',['searchFactory','sentimentTrendsFactory', function(searchFactory, sentimentTrendsFactory){
  var self = this;
  self.searches = [];
  self.resultReady = false;
  self.weekResults = []
  self.DATERANGE = [7,6, 4,3, 1,0]


  self.makeSearch = function(searchTerm){
    searchFactory.getSentimentResults(searchTerm).then(function(response){
      self.searches.unshift(response.data);
    });
    self.setResultStatus();
  };

  self.isResultReady = function(){
    return self.resultReady;
  };

  self.setResultStatus = function() {
    self.resultReady = true;
  };

  self.setSearchTerm = function(searchObject) {
    sentimentTrendsFactory.setSearchTerm(searchObject.search_term)
  }








  self.makeMultiDaySearch = function(searchTerm){
    self.searchFactory = new searchFactory(searchTerm);
    self.weekResults.unshift(self.searchFactory);
    self.setResultStatus();
  };



  self.multiDaySearches = function(searchTerm){
    var listParams = []
    var params;
    var dates = self.getDates(self.DATERANGE);
    for (var i= 0; i<(dates.length-1); i += 2){
      params = {search_term: searchTerm.search_term};
      params.date_from = dates[i];
      params.date_till = dates[i+1];
      listParams.push(params)
    }
    listParams.forEach(function(params){
      self.makeMultiDaySearch(params);
    })
  }



  self.getDates = function(dateRange){
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
