describe('factory: searchFactory', function() {

  var factory, searchTerm, dateFrom, dateTo, httpBackend;

  beforeEach(function(){
    module('DoesItSuck');
    inject(function(searchFactory, $httpBackend){
      factory = searchFactory;
      httpBackend = $httpBackend
      searchTerm = {search_term: 'Nokia'};
      httpBackend.whenGET('partials/main-search.html').respond({data: 'Success'});
   })
 });

 afterEach(function() {
   httpBackend.verifyNoOutstandingExpectation();
   httpBackend.verifyNoOutstandingRequest();
 });

   describe('calling Rails API to give search term', function(){

     it('sends out the searchterm and stores the response', function(){
       var url = 'https://does-it-suck-rails.herokuapp.com/search';
       httpBackend.flush();
       httpBackend
         .expectPOST(url,searchTerm)
         .respond( {result:'result'} )
       factory.query(searchTerm);
       httpBackend.flush();
     });
   });

   describe('single dated search', function(){
     dateFrom = '2014-03-22';
     dateTo = '2014-03-24';

     it('can send out a search with a specific date', function(){
       var url = 'https://does-it-suck-rails.herokuapp.com/search';
       httpBackend.flush();
       var params = {search_term: searchTerm, date_from: dateFrom, date_to: dateTo}
       factory.query(params);
       httpBackend
         .expectPOST(url, params )
         .respond({result:'result'} );
       httpBackend.flush();
     });
   });

});
