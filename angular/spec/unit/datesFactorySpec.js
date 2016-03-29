describe('Factory: datesFactory', function() {

var factory;

beforeEach(module('DoesItSuck'));

  beforeEach(inject(function(datesFactory){
     factory = datesFactory;
   }));

   describe('#getTwitterDates', function(){
     it('it sets the dates to a YYYY-MM-DD format, and returns the date x-days ago', function(){
       var today = new Date();
       var givenDay = new Date();
       givenDay.setFullYear(2016, 2, 16);
       var difDays = [(today - givenDay)/24/60/60/1000]; // Difference in days is given in milliseconds
       expect(factory.getTwitterDates(difDays)).toEqual(['2016-03-16']);
     });
   })
});
