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
