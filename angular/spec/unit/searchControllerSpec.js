describe('searchController', function() {

var searchFactoryMock, sentimentTrendsFactoryMock, ctrl, searchTerm, $q, rootScope, scope, httpBackend;


  beforeEach(function(){
    module('DoesItSuck');
      inject(function($rootScope, _$q_, $controller, $httpBackend){
        searchFactoryMock = {query: function(){} };
        sentimentTrendsFactoryMock = {setSearchTerm: function(){} };
        spyOn(sentimentTrendsFactoryMock,'setSearchTerm');
        scope = $rootScope.$new();
        $q = _$q_;
        httpBackend = $httpBackend;
        ctrl = $controller('searchController', {
          $scope: scope,
          searchFactory: searchFactoryMock,
          sentimentTrendsFactory : sentimentTrendsFactoryMock});
       })
      searchTerm = {search_term: 'Test searchTerm'};
 });


  describe('#setSearchTerm', function(){
    it('sentimentTrendsFactory is called', function(){
      ctrl.setSearchTerm(searchTerm);
      expect(sentimentTrendsFactoryMock.setSearchTerm).toHaveBeenCalled();
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





  // describe('#weekSearch', function(){
  //   it('inserts the current search findings into the weekSearch array', function(){
  //     var search = {search_term: 'Nokia'};
  //     ctrl.weekSearch(search);
  //     expect(ctrl.weekResults).toContain(search);
  //   });
  //
  //   it('starts the multiDaySearches', function(){
  //     var search = {search_term: 'Nokia'};
  //     ctrl.weekSearch(search);
  //     expect(searchFactoryMock).toHaveBeenCalled();
  //   });
  // })






  describe('#evaluateSearch', function() {
    var searchMockNeg = {positive: 1, negative: 5, neutral: 3};
    var searchMockPos = {positive: 12, negative: 5, neutral: 3};
    var searchMockNeut = {positive: 6, negative: 5, neutral: 10};
    var searchMockEq = {positive: 5, negative: 5, neutral: 5};
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
    var searchMockNeg = {positive: 1, negative: 5, neutral: 3};
    var searchMockPos = {positive: 12, negative: 5, neutral: 3};
    var searchMockNeut = {positive: 6, negative: 5, neutral: 10};
    var searchMockEq = {positive: 5, negative: 5, neutral: 5};
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
