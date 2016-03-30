doesItSuck.controller('compareController', ['presentationFactory','sentimentTrendsFactory', function(presentationFactory, sentimentTrendsFactory){

var self = this;
self.results = [];
self.ready = false;
self.presentationFactory = presentationFactory;
self.sentimentTrendsFactory = sentimentTrendsFactory;


  self.makeSearch = function(searchTermOne, searchTermTwo){
    self.results = sentimentTrendsFactory.makeSearch(searchTermOne, searchTermTwo);
    console.log(sentimentTrendsFactory.ready);
};

}]);
