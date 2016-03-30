describe('Factory: sentimentTrendsFactory', function() {

  var searchFactoryMock, datesFactoryMock, factory, searchPromise, resultsFactoryMock, $q, scope, httpBackend;

  beforeEach(module('DoesItSuck'));

  beforeEach(function() {
    var dates = ['2016-03-20','2016-03-20','2016-03-20','2016-03-20','2016-03-20','2016-03-20']
    resultsFactoryMock = {outcome: function(){} };
    datesFactoryMock = {getTwitterDates: function(){} };
    spyOn(datesFactoryMock,'getTwitterDates').and.returnValue(dates);
    searchFactoryMock = {query: function(){} };
    searchPromise = {value: 'test'};


  module('DoesItSuck', {
    searchFactory: searchFactoryMock,
    datesFactory: datesFactoryMock,
    resultsFactory: resultsFactoryMock,
    });
  });


  beforeEach(inject(function(sentimentTrendsFactory, _$q_, $rootScope, $httpBackend){
     factory = sentimentTrendsFactory;
     $q = _$q_;
     scope = $rootScope.$new();
     httpBackend = $httpBackend;
   }));

   describe('#setSearchTerm', function(){
     it('is set to blank initially', function(){
       expect(factory.getSearchTerm()).toBe(undefined);
     });

     it('can be set to a new searchterm', function(){
       var searchTerm = 'test';
       factory.setSearchTerm(searchTerm)
       expect(factory.getSearchTerm()).toEqual(searchTerm);
     });
   })

   describe('#makeParams', function(){
     it('returns a set of params for each date pair', function(){
       expect(factory.makeParams().length).toEqual((factory.LASTWEEKDATES.length/2));
     });

     it('has the format of search params', function(){
       factory.setSearchTerm('Test')
       var params = {search_term: 'Test', date_from:'2016-03-20', date_till: '2016-03-20' }
       expect(factory.makeParams()).toContain(params);
     });

     it('initates a call to the datesfactory', function(){
       factory.makeParams()
       expect(datesFactoryMock.getTwitterDates).toHaveBeenCalled();
     });
   })

   describe('searchPromises', function(){
     it('starts out empty', function(){
       expect(factory.searchPromises.length).toEqual(0);
     });
   });

   describe('#setSearchResult', function(){
     it('starts out empty', function(){
       expect(factory.getSearchResult()).toBe(undefined);
     });

     it('is set to the searchResult', function(){
       var searchResult = {contains: 'multiple items'};
       factory.setSearchResult(searchResult);
       expect(factory.getSearchResult()).toEqual(searchResult);
     });
   });


   describe('#getResults', function(){
     beforeEach(function(){
       spyOn(searchFactoryMock, 'query').and.returnValue(searchPromise);
     });

     it('initates a call to the searchFactory', function(){
       factory.getResults();
       expect(searchFactoryMock.query).toHaveBeenCalled();
     });

     it('returns searchpromises', function(){
       factory.setSearchTerm('Test')
       var result = {searchTerm: 'Test', result: searchPromise}
       expect(factory.getResults()).toEqual([result, result, result]);
     });
   });

   describe('#makeSearch', function(){
     var convertedSearchTerm, searchTermOne, searchTermTwo

     beforeEach(function(){
       searchResultMock = {search_term:'Test1', positive: 10, negative: 20};
       var deferred = $q.defer();
       deferred.resolve({data:searchResultMock});
       spyOn(searchFactoryMock,'query').and.returnValue( deferred.promise );
       searchTermOne = 'iphone6';
       searchTermTwo = 'iphone5';
       convertedSearchTerm = {search_term: searchTermOne};
       httpBackend.whenGET('partials/main-search.html').respond({data: 'Success'});
     });

     it('calls the searchfactory with each of the searchterms',function(){
       factory.makeSearch(searchTermOne, searchTermTwo);
       expect(searchFactoryMock.query).toHaveBeenCalled();
     });

     it('the return data is stored in results', function(){
       scope.$apply();
       expect(factory.makeSearch(searchTermOne, searchTermTwo)).toContain([searchResultMock, searchResultMock]);

     });
    });
});
