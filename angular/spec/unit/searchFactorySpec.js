describe('factory: searchFactory', function() {

  beforeEach(module('DoesItSuck'));
  var factory;


  beforeEach(inject(function(searchFactory){
     factory = new searchFactory();
   }));

   describe('calling Rails API to search for a Twitter data', function(){

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
         .when("POST", url)
         .respond(result);
     }));

     it('displays search results', function(){
       console.log(factory);
       var searchTerm = 'Nokia'
       factory.search(searchTerm)
       .then(function(response) {
         expect(response.data).toEqual(result);
       });
       httpBackend.flush();
     });
   });

});
