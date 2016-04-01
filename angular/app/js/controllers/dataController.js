doesItSuck.controller('dataController',dataController);

dataController.$inject = ['storageFactory', 'presentationFactory'];

function dataController(storageFactory, presentationFactory){
  var self = this;

  getSearchResult();

  function getSearchResult(){
    var results = storageFactory.getSearchResult();
    angular.extend(self, results);
    presentationFactory.insertHTML(self.messages);
  }

}
