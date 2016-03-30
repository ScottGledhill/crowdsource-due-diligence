describe('dataController', function() {

var sentimentTrendsFactoryMock, ctrl, MOCK_MESSAGES, MOCK_SEARCH_RESULTS;
var presentationFactoryMock;

  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($controller) {

    MOCK_MESSAGES = [{sentiment: 'Positive', posWords: ['love'], negWords: [], content: 'love my new iPhone! <3'},
      {sentiment: 'Negative', posWords: [], negWords: ['Damn', 'hate', 'annoying'], content:'Damn, my iphone just broke. Hate when it happens. so annoying'},
      {sentiment: 'Positive', posWords:['Cool', 'awesome'], negWords:['expensive'], content:'iPhone are soooo cool and awesome, but so expensive!' }];

    MOCK_SEARCH_RESULTS = {
      searchTerm: 'iPhone',
      positive: '2',
      negative: '1',
      neutral: '50',
      messages: MOCK_MESSAGES};

        presentationFactoryMock = {insertHTML: function(){} };
        spyOn(presentationFactoryMock, 'insertHTML');
        sentimentTrendsFactoryMock = {getSearchResult: function(){} };
        spyOn(sentimentTrendsFactoryMock,'getSearchResult').and.returnValue(MOCK_SEARCH_RESULTS);
        ctrl = $controller('dataController', {
          sentimentTrendsFactory: sentimentTrendsFactoryMock,
          presentationFactory: presentationFactoryMock});
       })
 );

 describe('#getSearchResults', function(){

   it('sentimentTrendsFactory is called when initialised', function(){
     expect(sentimentTrendsFactoryMock.getSearchResult).toHaveBeenCalled();
     ctrl.messages ="";
   });

   it('extends the response data: SearchTerm', function(){
     expect(ctrl.searchTerm).toEqual(MOCK_SEARCH_RESULTS.searchTerm);
   });

   it('extends the response data: positive', function(){
     expect(ctrl.positive).toEqual(MOCK_SEARCH_RESULTS.positive);

   });

   it('extends the response data: messages', function(){
     expect(ctrl.messages).toEqual(MOCK_SEARCH_RESULTS.messages);
   });
 });
});
