describe('Factory: storageFactory', function() {

  var factory, localStorageServiceMock, scope;

  beforeEach(module('DoesItSuck'));

  beforeEach(function() {
    localStorageServiceMock = {outcome: function(){} };

    module('DoesItSuck', {
      localStorageService: localStorageServiceMock
    });
  });
  
  beforeEach(inject(function(storageFactory){
     factory = storageFactory;
  }));

  describe('#setSearchResult', function(){
    it('starts out empty', function(){
      expect(factory.getSearchResult()).toBe(undefined);
    });

    it('is set to the searchResult', function(){
      var searchResult = {contains: 'multiple items'};
      factory.setSearchResult(searchResult);
      expect(factory.getSearchResult()).toEqual(searchResult);
    });
  });
});
