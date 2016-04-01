describe('compareController', function() {
  var ctrl, $q, searchResultMock, searchTerm, httpBackend, presentationFactoryMock, sentimentTrendsFactoryMock;

  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($rootScope, _$q_, $controller, $httpBackend){

    httpBackend = $httpBackend;
    sentimentTrendsFactoryMock = {makeSearch: function(){}};
    presentationFactoryMock = {getColorScheme: function(){}};
    // searchResultMock = {search_term:'Test1', positive: 10, negative: 20};
    // var deferred = $q.defer();
    // deferred.resolve({data:searchResultMock});
    // searchFactoryMock = {query: function(){} };
    // spyOn(searchFactoryMock,'query').and.returnValue( deferred.promise );

    ctrl = $controller('compareController', {
        searchFactory: searchFactoryMock,
        presentationFactory: presentationFactoryMock,
        $q: $q,
        sentimentTrendsFactory: sentimentTrendsFactoryMock
      });
    }));

  xdescribe('makesearch', function(){

  })

});
