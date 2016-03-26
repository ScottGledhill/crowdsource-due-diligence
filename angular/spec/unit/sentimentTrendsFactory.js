describe('searchController', function() {

var searchFactoryMock;

  beforeEach(function() {
    searchFactoryMock = jasmine.createSpy('searchFactory');
    module('DoesItSuck', {
      searchFactory: searchFactoryMock
    });
  });
  var ctrl, searchTerm;


  beforeEach(inject(function($controller){
     ctrl = $controller('searchController');
   }));
});


describe('#getDates', function(){
  it('returns the dates 7 and 6 days ago in the right format', function(){
    var dateRange = [7, 6, 0];
    expect(ctrl.getDates(dateRange).length).toEqual(3);
  });
})
