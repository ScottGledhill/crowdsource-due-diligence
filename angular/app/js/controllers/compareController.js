doesItSuck.controller('compareController', compareController);

compareController.$inject = ['presentationFactory','sentimentTrendsFactory'];

function compareController(presentationFactory, sentimentTrendsFactory){
  var self = this;
  self.results = [];
  self.ready = false;
  self.presentationFactory = presentationFactory;
  self.sentimentTrendsFactory = sentimentTrendsFactory;
  self.makeSearch = makeSearch;
  self.deleteResult = deleteResult;

  function makeSearch (searchTermOne, searchTermTwo) {
    self.results = sentimentTrendsFactory.makeSearch(searchTermOne, searchTermTwo);
    self.ready = true;
  }

  function deleteResult (result) {
    var index = self.results.indexOf(result);
    if (index > -1) {self.results.splice(index,1);}
  }

}
