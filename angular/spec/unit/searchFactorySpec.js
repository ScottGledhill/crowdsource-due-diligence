describe('factory: searchFactory', function() {

  beforeEach(module('DoesItSuck'));
  var factory, searchTerm, dateFrom, dateTo;;

  beforeEach(inject(function(searchFactory){
    // dateFrom = '2014-03-22';
    // dateTo = '2014-03-24';
    // var params = {search_term: searchTerm, date_from: dateFrom, date_to: dateTo}
    // var factory2 = new searchFactory(params);
   }));

   describe('calling Rails API to give search term', function(){
     var result = {
                     search_term: 'Nokia',
                     positive: 4,
                     neutral: 1,
                     negative: 50
                   };
     var httpBackend;
     beforeEach(inject(function(searchFactory, $httpBackend){
       searchTerm = {search_term: 'Nokia'};
       factory = new searchFactory(searchTerm);
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

   describe('single dated search', function(){
     dateFrom = '2014-03-22';
     dateTo = '2014-03-24';
     var result = {
                   search_term: 'Nokia',
                   date_from: dateFrom,
                   date_to: dateTo,
                   positive: 4,
                   neutral: 1,
                   negative: 50
                   };
     var httpBackend;
     beforeEach(inject(function(searchFactory, $httpBackend){
       searchTerm = 'Nokia';
       var params = {search_term: searchTerm, date_from: dateFrom, date_to: dateTo}
       factory = new searchFactory(params);
       httpBackend = $httpBackend
       var url = 'http://localhost:3000/search';
       httpBackend
         .expectPOST(url,{search_term: 'Nokia', date_from: dateFrom, date_to: dateTo })
         .respond(result);
     }));

     it('can send out a search with a specific date', function(){
       httpBackend.flush();
       expect(factory.date_from).toEqual(result.date_from);
     });
   });

});
