describe('dataController', function() {

var sentimentTrendsFactoryMock, ctrl, MOCK_MESSAGES, MOCK_SEARCH_RESULTS;


  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($controller) {

    MOCK_MESSAGES = [{sentiment: 'Positive', posWords: ['love'], negWords: [], content: 'love my new iPhone! <3'},
      {sentiment: 'Negative', posWords: [], negWords: ['Damn', 'hate', 'annoying'], content:'Damn, my iphone just broke. Hate when it happens. so annoying'},
      {sentiment: 'Positive', posWords:['Cool', 'awesome'], negWords:['expensive'], content:'iPhone are soooo cool and awesome, but so expensive!' }]

    MOCK_SEARCH_RESULTS = {
      searchTerm: 'iPhone',
      totalPositive: '2',
      totalNegative: '1',
      totalNeutral: '50',
      messages: MOCK_MESSAGES}

        sentimentTrendsFactoryMock = {getSearchResult: function(){} };
        spyOn(sentimentTrendsFactoryMock,'getSearchResult').and.returnValue(MOCK_SEARCH_RESULTS);
        ctrl = $controller('dataController', {
          sentimentTrendsFactory: sentimentTrendsFactoryMock});
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

   it('extends the response data: totalPositive', function(){
     expect(ctrl.totalPositive).toEqual(MOCK_SEARCH_RESULTS.totalPositive);

   });

   it('extends the response data: messages', function(){
     expect(ctrl.messages).toEqual(MOCK_SEARCH_RESULTS.messages);
   });
 });

 describe('innsert html tag', function(){

   it('sentimentTrendsFactory is called when initialised', function(){
     var updatedMsg = "<span class='Positive-message'><span class='positive-word'>love</span> my new iPhone! <3</span>"
     expect(ctrl.messages[0].content).toEqual(updatedMsg);
   });

 })
});
