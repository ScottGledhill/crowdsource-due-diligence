describe('factory: searchFactory', function() {

  beforeEach(module('DoesItSuck'));
  var factory;


  beforeEach(inject(function(searchFactory){
     factory = new searchFactory();
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
       var url = 'localhost:3000/twitter/create';
       httpBackend
         .expectPOST(url,'Nokia')
         .respond(result);
     }));

     it('sends out the searchterm', function(){
       var searchTerm = 'Nokia';
       factory.search(searchTerm);
       httpBackend.flush();
       expect(factory.searchResult).toEqual(result);
     });

     it("stores the responses in an object",function(){
       var searchTerm = 'Nokia'
       factory.search(searchTerm)
       httpBackend.flush();
       expect(factory.searchResult.positive).toEqual(result.positive)
     });

   });

});
