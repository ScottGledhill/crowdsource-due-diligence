doesItSuck.controller('dataController',['storageFactory', 'presentationFactory', function(storageFactory, presentationFactory){
  var self = this;

  getSearchResult();

  function getSearchResult(){
    var results = storageFactory.getSearchResult();
    angular.extend(self, results);
    presentationFactory.insertHTML(self.messages);
  }

}]);
