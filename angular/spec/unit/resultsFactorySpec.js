describe('Factory: resultsFactory', function() {

var factory;

beforeEach(module('DoesItSuck'));

  beforeEach(inject(function(resultsFactory){
     factory = resultsFactory;
   }));

   describe('#outcome', function(){
     it('can declare a winner', function(){
       var searchResultMock = {search_term:'Test1', positive: 10, negative: 20};
       var searchResultMockTwo = {search_term:'Test2', positive: 20, negative: 20};
       var array = [searchResultMock, searchResultMockTwo];
       factory.outcome(array[0], array[1]);
       expect(array[1].winner).toEqual(true);
     });
   });
});
