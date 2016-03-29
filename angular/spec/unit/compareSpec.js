describe('compareController', function() {
  var searchFactoryMock, ctrl, $q, searchResult, searchTerm, httpBackend;

  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($rootScope, _$q_, $controller, $httpBackend){
    scope = $rootScope.$new();
    $q = _$q_;
    httpBackend = $httpBackend;
    var deferred = $q.defer();
    deferred.resolve({data:'some value'});
    searchFactoryMock = {query: function(){} };
    spyOn(searchFactoryMock,'query').and.returnValue( deferred.promise );
    searchResult = []
    searchTerm = {search_term: 'Test searchTerm'};

    ctrl = $controller('compareController', {
        searchFactory: searchFactoryMock
      });
    }));

  describe('#makeSearch', function(){
    var convertedSearchTerm;

    beforeEach(function(){
      var searchTermOne = 'iphone6';
      var searchTermTwo = 'iphone5';
      convertedSearchTerm = {search_term: searchTermOne};
      ctrl.makeSearch(searchTermOne, searchTermTwo);
      httpBackend.whenGET('partials/main-search.html').respond({data: 'Success'});

    })

    it('converts the searchterms into the right format', function(){
      expect(ctrl.searchTerms).toContain(convertedSearchTerm);
    });

    it('calls the searchfactory with each of the searchterms',function(){
      expect(searchFactoryMock.query).toHaveBeenCalled();
    })

    it('the return data is stored in results', function(){
      console.log(ctrl.results)
      scope.$apply();
      expect(ctrl.results).toContain('some value')
    })

  });
});
