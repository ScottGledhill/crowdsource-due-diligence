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

    describe('insert html tag', function(){

      it('changes the message for a positive message', function(){
        var message = {sentiment: 'Positive', posWords: ['love'], negWords: [], content: 'love my new iPhone! <3'}
        var updatedMsg = "<span class='Positive-message'><span class='positive-word big-font'>love</span> my new iPhone! <3</span>";
        factory.insertHTML([message]);
        expect(message.content).toEqual(updatedMsg);
      });

      it('changes the message for a negative message', function(){
        var message = {sentiment: 'Negative', posWords: [], negWords: ['Damn', 'hate', 'annoying'], content:'Damn, my iphone just broke. Hate when it happens. so annoying'};
        var updatedMsg = "<span class='Negative-message'><span class='negative-word big-font'>Damn</span>, my iphone just broke. <span class='negative-word big-font'>hate</span> when it happens. so <span class='negative-word big-font'>annoying</span></span>";
        factory.insertHTML([message]);
        expect(message.content).toEqual(updatedMsg);
      });
    });
  });
});
