describe('Factory: sentimentTrendsFactory', function() {

var searchFactoryMock, datesFactoryMock, factory, searchPromise;

beforeEach(module('DoesItSuck'));


beforeEach(function() {
  var dates = ['2016-03-20','2016-03-20','2016-03-20','2016-03-20','2016-03-20','2016-03-20']
  datesFactoryMock = {getTwitterDates: function(){} };
  spyOn(datesFactoryMock,'getTwitterDates').and.returnValue(dates);
  searchPromise = {value: 'test'};
  searchFactoryMock = {query: function(){} };
  spyOn(searchFactoryMock, 'query').and.returnValue(searchPromise);


  module('DoesItSuck', {
    searchFactory: searchFactoryMock,
    datesFactory: datesFactoryMock
  });
});


  beforeEach(inject(function(sentimentTrendsFactory){
     factory = sentimentTrendsFactory;
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

   // TODO include once we have integrated with backend
   xdescribe('#setSearchResult', function(){
     it('starts out empty', function(){
       expect(factory.getSearchResult()).toEqual('');
     });

     it('is set to the searchResult', function(){
       var searchResult = {contains: 'multiple items'}
       factory.setSearchResult(searchResult)
       expect(factory.getSearchResult()).toEqual(searchResult);
     });
   });


     describe('#getResults', function(){
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
});
