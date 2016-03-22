describe('factory: searchFactory', function() {

  beforeEach(module('DoesItSuck'));
  var factory, searchTerm;

  beforeEach(inject(function(searchFactory){
    searchTerm = 'Nokia'
    factory = new searchFactory(searchTerm);
   }));

   describe('calling Rails API to give search term', function(){

     var result = {
                     search_term: 'Nokia',
                     positive: 4,
                     neutral: 1,
                     negative: 50
                   };

     var httpBackend;
     beforeEach(inject(function($httpBackend){
       httpBackend = $httpBackend
       var url = 'http://localhost:3000/search';
       httpBackend
         .expectPOST(url,{search_term: 'Nokia'})
         .respond(result);
     }));

     it('sends out the searchterm and stores the response', function(){
       httpBackend.flush();
       expect(factory.positive).toEqual(result.positive);
     });

   });

});
