describe('searchController', function() {

var searchFactoryMock, sentimentTrendsFactoryMock, ctrl, searchTerm, $q, rootScope, scope, httpBackend, localStorageServiceMock, presentationFactoryMock, searchResult;


  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($rootScope, _$q_, $controller, $httpBackend){
    scope = $rootScope.$new();
    $q = _$q_;
    httpBackend = $httpBackend;
    searchFactoryMock = {query: function(){} };
    sentimentTrendsFactoryMock = {setSearchTerm: function(){},setSearchResult: function(){} };
    localStorageServiceMock = {get: function(){}, set: function (){}, keys: function(){ return ['test']} };
    searchResult = [];
    spyOn(localStorageServiceMock,'get').and.returnValue(searchResult);
    searchTerm = {search_term: 'Test searchTerm'};
    presentationFactoryMock = {evaluateSearch: function(){}, getFullColorScheme: function(){}};
    ctrl = $controller('searchController', {
      $scope: scope,
      searchFactory: searchFactoryMock,
      sentimentTrendsFactory: sentimentTrendsFactoryMock,
      localStorageService: localStorageServiceMock,
      presentationFactory: presentationFactoryMock
    });
  }));

 describe('#getHistory', function(){
   it('is called when ctrl is loaded', function(){
     expect(ctrl.searches).toEqual(searchResult);
   });

   it('local storage is called to retrieve previous results', function(){
     expect(localStorageServiceMock.get).toHaveBeenCalled();
   });

   it('results from local storage is entered into searches', function(){
     expect(ctrl.searches).toEqual(searchResult);
   });
 });

 describe('#setHistory', function(){
   var key;

   beforeEach(function(){
     spyOn(localStorageServiceMock,'set');
     key = 'resultHistory';
   });

   it('local storage is called to retrieve previous results', function(){
     ctrl.setHistory(key,searchResult);
     expect(localStorageServiceMock.set).toHaveBeenCalledWith(key, searchResult);
   });

   it('is called when a user moves from the page', function(){
     scope.$broadcast("$routeChangeStart");
     expect(localStorageServiceMock.set).toHaveBeenCalled();
   });
 });

 describe('#deleteSearch', function(){

   beforeEach(function(){
     spyOn(sentimentTrendsFactoryMock,'setSearchTerm');
     spyOn(localStorageServiceMock,'set');
     var deferred = $q.defer();
     deferred.resolve({data:'some value'});
     spyOn(searchFactoryMock,'query').and.returnValue( deferred.promise );
     httpBackend.whenGET('partials/main-search.html').respond({data: 'Success'});
     ctrl.makeSearch(searchTerm);
   });

   it('a user can delete a search item', function(){
     ctrl.delete('some value');
     expect(ctrl.searches.length).toEqual(0);
   });

   it ('updates the local storage', function(){
     ctrl.delete('some value');
     expect(localStorageServiceMock.set).toHaveBeenCalled();
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
