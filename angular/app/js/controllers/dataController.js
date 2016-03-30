doesItSuck.controller('dataController',['sentimentTrendsFactory', 'presentationFactory', function(sentimentTrendsFactory, presentationFactory){
  var self = this;

  getSearchResult();

  function getSearchResult(){
    var resultObj = sentimentTrendsFactory.getSearchResult();
    var results = resultObj;
    angular.extend(self, results);
    presentationFactory.insertHTML(self.messages);
  }

}]);
