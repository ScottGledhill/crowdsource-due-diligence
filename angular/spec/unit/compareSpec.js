describe('compareController', function() {
  var searchFactoryMock, ctrl, $q, searchResultMock, searchTerm, httpBackend;

  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($rootScope, _$q_, $controller, $httpBackend){
    scope = $rootScope.$new();
    $q = _$q_;
    httpBackend = $httpBackend;
    searchResultMock = {search_term:'Test1', positive: 10, negative: 20};
    var deferred = $q.defer();
    deferred.resolve({data:searchResultMock});
    searchFactoryMock = {query: function(){} };
    spyOn(searchFactoryMock,'query').and.returnValue( deferred.promise );

    ctrl = $controller('compareController', {
        searchFactory: searchFactoryMock,
        $q: $q
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

    });

    it('converts the searchterms into the right format', function(){
      expect(ctrl.searchTerms).toContain(convertedSearchTerm);
    });

    it('calls the searchfactory with each of the searchterms',function(){
      expect(searchFactoryMock.query).toHaveBeenCalled();
    });

    it('the return data is stored in results', function(){
      scope.$apply();
      expect(ctrl.results).toContain([searchResultMock, searchResultMock]);
    });

    describe('#outcome', function(){

      it('can declare a winner', function(){
        var searchResultMock = {search_term:'Test1', positive: 10, negative: 20};
        var searchResultMockTwo = {search_term:'Test2', positive: 20, negative: 20};
        var array = [searchResultMock, searchResultMockTwo];
        expect(ctrl.outcome(array)).toEqual('Test1 Sucks');


      });
    });


  });
});
