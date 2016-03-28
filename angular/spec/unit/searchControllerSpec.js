describe('searchController', function() {

var searchFactoryMock, sentimentTrendsFactoryMock, ctrl, searchTerm, $q, rootScope, scope, httpBackend, localStorageServiceMock, searchResult;


  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($rootScope, _$q_, $controller, $httpBackend){
    scope = $rootScope.$new();
    $q = _$q_;
    httpBackend = $httpBackend;
    searchFactoryMock = {query: function(){} };
    sentimentTrendsFactoryMock = {setSearchTerm: function(){},setSearchResult: function(){} };
    localStorageServiceMock = {get: function(){}, set: function (){} };
    searchResult = []
    spyOn(localStorageServiceMock,'get').and.returnValue(searchResult);
    searchTerm = {search_term: 'Test searchTerm'};
    ctrl = $controller('searchController', {
      $scope: scope,
      searchFactory: searchFactoryMock,
      sentimentTrendsFactory: sentimentTrendsFactoryMock,
      localStorageService: localStorageServiceMock
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
     key = 'resultHistory'
   });

   it('local storage is called to retrieve previous results', function(){
     ctrl.setHistory(key,searchResult)
     expect(localStorageServiceMock.set).toHaveBeenCalledWith(key, searchResult);
   });

   it('is called when a user moves from the page', function(){
     ctrl.changeController();
     expect(localStorageServiceMock.set).toHaveBeenCalled();
   });
 });

 describe('#changeController', function(){
   beforeEach(function(){
     spyOn(sentimentTrendsFactoryMock,'setSearchTerm');
     spyOn(localStorageServiceMock,'set');
     ctrl.changeController();
   })
   it('calls on localstorage when a user moves from the page', function(){
     expect(localStorageServiceMock.set).toHaveBeenCalled();
   });

   it('calls on setSearch and sentimentTrendsFactory', function(){
     expect(sentimentTrendsFactoryMock.setSearchTerm).toHaveBeenCalled();
   });
 });

  describe('#passResults', function(){
    it('sends results of a search result to the sentimentTrendsFactory', function(){
      var search= {search_term:'SearchTerm', positive: '60', negative: '50',neutral: '50', message:{first: 'Many messages'}};
      spyOn(sentimentTrendsFactoryMock,'setSearchResult');
      ctrl.passResults(search);
      expect(sentimentTrendsFactoryMock.setSearchResult).toHaveBeenCalledWith(search);
    });
  });

  describe('#makeSearch', function(){
    beforeEach(function(){
      var deferred = $q.defer();
      deferred.resolve({data:'some value'})
      spyOn(searchFactoryMock,'query').and.returnValue( deferred.promise );
      httpBackend.whenGET('partials/main-search.html').respond({data: 'Success'});
    })

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

  describe("presentation methods", function(){
    var searchMockNeg, searchMockPos, searchMockNeut, searchMockEq;

    beforeEach(function() {
      searchMockNeg = {positive: 1, negative: 5, neutral: 3};
      searchMockPos = {positive: 12, negative: 5, neutral: 3};
      searchMockNeut = {positive: 6, negative: 5, neutral: 10};
      searchMockEq = {positive: 5, negative: 5, neutral: 5};
    })
    describe('#evaluateSearch', function() {

      it('returns SUCKS if negative is greatest', function() {
        expect(ctrl.evaluateSearch(searchMockNeg)).toEqual('SUCKS');
      });
      it('returns DOESN\'T SUCK if positive is greatest', function() {
        expect(ctrl.evaluateSearch(searchMockPos)).toEqual('DOESN\'T SUCK');
      });
      it('returns MEH if neutral is greatest', function() {
        expect(ctrl.evaluateSearch(searchMockNeut)).toEqual('MEH');
      });
      it('returns MEH if all are equal', function() {
        expect(ctrl.evaluateSearch(searchMockEq)).toEqual('MEH');
      });
    });

    describe('calcBgCol', function() {
      it('sets col to red if SUCKS', function() {
        expect(ctrl.calcBgCol(searchMockNeg)).toEqual('red');
      });

      it('sets col to yellow if MEH', function() {
        expect(ctrl.calcBgCol(searchMockNeut)).toEqual('yellow');
      });

      it('sets col to green', function() {
        expect(ctrl.calcBgCol(searchMockPos)).toEqual('green');
      });
    });

  });


});
