describe('compareController', function() {
  var searchFactoryMock, ctrl, $q, searchResultMock, searchTerm, httpBackend, presentationFactoryMock;

  beforeEach(module('DoesItSuck'));

  beforeEach(inject(function($rootScope, _$q_, $controller, $httpBackend){
    scope = $rootScope.$new();
    $q = _$q_;
    httpBackend = $httpBackend;
    presentationFactoryMock = {getColorScheme: function(){}};
    searchResultMock = {search_term:'Test1', positive: 10, negative: 20};
    var deferred = $q.defer();
    deferred.resolve({data:searchResultMock});
    searchFactoryMock = {query: function(){} };
    spyOn(searchFactoryMock,'query').and.returnValue( deferred.promise );

    ctrl = $controller('compareController', {
        searchFactory: searchFactoryMock,
        presentationFactory: presentationFactoryMock,
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
        ctrl.outcome(array[0], array[1]);
        expect(array[1].winner).toEqual(true);
      });
    });

    describe('#getColorScheme', function(){
      it('calls the presentationFactory to receive the color class', function(){
        spyOn(presentationFactoryMock, 'getColorScheme');
        var obj = {};
        ctrl.getColorScheme(obj);
        expect(presentationFactoryMock.getColorScheme).toHaveBeenCalled();
      });
    });


  });
});
