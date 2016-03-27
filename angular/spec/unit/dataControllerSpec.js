describe('dataController', function() {

var sentimentTrendsFactoryMock, ctrl, $q, rootScope, scope;

var MOCK_SEARCH_RESULTS = {
  searchTerm: 'iPhone',
  totalPositive: '2',
  totalNegative: '1',
  totalNeutral: '50',
  messages: MOCK_MESSAGES
}

var MOCK_MESSAGES = [{sentiment: 'Positive', posWords: ['love'], negWords: [], content: 'love my new iPhone! <3'},
  {sentiment: 'Negative', posWords: [], negWords: ['Damn', 'hate', 'annoying'], content:'Damn, my iphone just broke. Hate when it happens. so annoying'},
  {sentiment: 'Positive', posWords:['Cool', 'awesome'], negWords:['expensive'], content:'iPhone are soooo cool and awesome, but so expensive!' }]


  beforeEach(module('DoesItSuck'));
  beforeEach(inject(function($controller, $rootScope, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        sentimentTrendsFactoryMock = {getSearchResult: function(){} };
        spyOn(sentimentTrendsFactoryMock,'getSearchResult').and.returnValue(MOCK_SEARCH_RESULTS);
        ctrl = $controller('dataController', {
          $scope: scope,
          sentimentTrendsFactory: sentimentTrendsFactoryMock});

       })
 );

 describe('#getSearchResults', function(){
   beforeEach(function(){
     httpBackend.expectGET('partials/main-search.html').respond({data: 'Success'});
   })

   it('sentimentTrendsFactory is called when initialised', function(){
     scope.$digest();
     expect(sentimentTrendsFactoryMock.getSearchResult).toHaveBeenCalled();
   });

   it('extends the response data: SearchTerm', function(){
     scope.$apply();
     expect(ctrl.searchTerm).toEqual(MOCK_SEARCH_RESULTS.searchTerm);
   });

   it('extends the response data: totalPositive', function(){
     scope.$apply();
     expect(ctrl.totalPositive).toEqual(MOCK_SEARCH_RESULTS.totalPositive);
   });

   it('extends the response data: messages', function(){
     scope.$apply();
     expect(ctrl.messages).toEqual(MOCK_SEARCH_RESULTS.messages);
   });
 });
});
