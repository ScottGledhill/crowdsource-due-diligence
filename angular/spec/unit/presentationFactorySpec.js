describe('Factory: presentationFactory', function() {

var factory;

beforeEach(module('DoesItSuck'));

  beforeEach(inject(function(presentationFactory){
     factory = presentationFactory;
   }));

   describe("presentation methods", function(){
     var searchMockNeg, searchMockPos, searchMockNeut, searchMockEq;

     beforeEach(function() {
       searchMockNeg = {positive: 1, negative: 5, neutral: 3};
       searchMockPos = {positive: 12, negative: 5, neutral: 3};
       searchMockNeut = {positive: 6, negative: 5, neutral: 10};
       searchMockEq = {positive: 5, negative: 5, neutral: 5};
     });
   describe('#evaluateSearch', function() {

     it('returns SUCKS if negative is greatest', function() {
       expect(factory.evaluateSearch(searchMockNeg)).toEqual('SUCKS');
     });
     it('returns DOESN\'T SUCK if positive is greatest', function() {
       expect(factory.evaluateSearch(searchMockPos)).toEqual('DOESN\'T SUCK');
     });
     it('returns MEH if neutral is greatest', function() {
       expect(factory.evaluateSearch(searchMockNeut)).toEqual('MEH');
     });
     it('returns MEH if all are equal', function() {
       expect(factory.evaluateSearch(searchMockEq)).toEqual('MEH');
     });
   });

   describe('getFullColorScheme', function() {
     it('sets col to red if SUCKS', function() {
       expect(factory.getFullColorScheme(searchMockNeg)).toEqual('red');
     });

     it('sets col to yellow if MEH', function() {
       expect(factory.getFullColorScheme(searchMockNeut)).toEqual('yellow');
     });

     it('sets col to green', function() {
       expect(factory.getFullColorScheme(searchMockPos)).toEqual('green');
     });
   });
 });
});
