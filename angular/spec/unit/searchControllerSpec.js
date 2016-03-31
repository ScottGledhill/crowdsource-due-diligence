describe('searchController', function() {

var searchFactoryMock, sentimentTrendsFactoryMock, ctrl, searchTerm, $q, rootScope, scope, httpBackend, storageFactoryMock, presentationFactoryMock, searchResult;


  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($rootScope, _$q_, $controller, $httpBackend){
    scope = $rootScope.$new();
    $q = _$q_;
    httpBackend = $httpBackend;
    searchFactoryMock = {query: function(){} };
    sentimentTrendsFactoryMock = {setSearchTerm: function(){},setSearchResult: function(){} };
    storageFactoryMock = {getHistory: function(){}, setHistory: function (){} };
    searchResult = [];
    spyOn(storageFactoryMock,'getHistory').and.returnValue(searchResult);
    searchTerm = {search_term: 'Test searchTerm'};
    presentationFactoryMock = {evaluateSearch: function(){}, getFullColorScheme: function(){}};
    ctrl = $controller('searchController', {
      $scope: scope,
      searchFactory: searchFactoryMock,
      sentimentTrendsFactory: sentimentTrendsFactoryMock,
      storageFactory: storageFactoryMock,
      presentationFactory: presentationFactoryMock
    });
  }));

 describe('#getHistory', function(){
   it('is called when ctrl is loaded', function(){
     expect(ctrl.searches).toEqual(searchResult);
   });

   it('local storage is called to retrieve previous results', function(){
     expect(storageFactoryMock.getHistory).toHaveBeenCalled();
   });

   it('results from local storage is entered into searches', function(){
     expect(ctrl.searches).toEqual(searchResult);
   });
 });

 describe('#setHistory', function(){
   var key;

   beforeEach(function(){
     spyOn(storageFactoryMock,'setHistory');
     key = 'resultHistory';
   });

  //  it('local storage is called to retrieve previous results', function(){
  //    storageFactoryMock.setHistory(key,searchResult);
  //    expect(storageFactoryMock.setHistory).toHaveBeenCalledWith(key, searchResult);
  //  });

   it('is called when a user moves from the page', function(){
     scope.$broadcast("$routeChangeStart");
     expect(storageFactoryMock.setHistory).toHaveBeenCalledWith(key,searchResult);
   });
 });

 describe('#deleteSearch', function(){

   beforeEach(function(){
     spyOn(sentimentTrendsFactoryMock,'setSearchTerm');
     spyOn(storageFactoryMock,'setHistory');
     var deferred = $q.defer();
     deferred.resolve({data:'some value'});
     spyOn(searchFactoryMock,'query').and.returnValue( deferred.promise );
     httpBackend.whenGET('partials/main-search.html').respond({data: 'Success'});
     ctrl.makeSearch(searchTerm);
   });

   it('a user can delete a search item', function(){
     ctrl.deleteResult('some value');
     expect(ctrl.searches.length).toEqual(0);
   });

   it ('updates the local storage', function(){
     ctrl.deleteResult('some value');
     expect(storageFactoryMock.setHistory).toHaveBeenCalled();
   });
 });

  describe('#makeSearch', function(){
    beforeEach(function(){
      var deferred = $q.defer();
      deferred.resolve({data:'some value'});
      spyOn(searchFactoryMock,'query').and.returnValue( deferred.promise );
      httpBackend.whenGET('partials/main-search.html').respond({data: 'Success'});
    });

    it('searchFactory is called', function(){
      ctrl.makeSearch(searchTerm);
      expect(searchFactoryMock.query).toHaveBeenCalled();
    });

    it('returns the response data', function(){
      ctrl.makeSearch(searchTerm);
      scope.$apply();
      expect(ctrl.searches.length).toEqual(1);
    });
  });


});
