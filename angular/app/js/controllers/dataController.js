doesItSuck.controller('dataController',['sentimentTrendsFactory', 'presentationFactory', function(sentimentTrendsFactory, presentationFactory){
  var self = this;

  getSearchResult();

  function getSearchResult(){
    var results = sentimentTrendsFactory.getSearchResult();
    angular.extend(self, results);
    presentationFactory.insertHTML(self.messages);
  }

}]);
