describe('searchController', function() {

var searchFactoryMock, sentimentTrendsFactoryMock, ctrl, searchTerm, $q, rootScope, scope, httpBackend;
  //
  // beforeEach(function() {
  //   // searchFactoryMock = {query: function(){} };
  //   // sentimentTrendsFactoryMock = {setSearchTerm: function(){} };
  //   // spyOn(sentimentTrendsFactoryMock,'setSearchTerm');
  //
  //    {
  //     // searchFactory: searchFactoryMock,
  //     // sentimentTrendsFactory : sentimentTrendsFactoryMock
  //   });
  // });
  // var ;


  beforeEach(function(){
    module('DoesItSuck');
      inject(function($rootScope, _$q_, $controller, $httpBackend){
        searchFactoryMock = {query: function(){return {data:'this is a value'}} };
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
 });


  describe('#setResultStatus', function() {

    it('starts with not showing the page', function() {
      expect(ctrl.isResultReady()).toEqual(false);
    });

    it('changes resultReady boolean', function() {
      ctrl.setResultStatus();
      expect(ctrl.isResultReady()).toEqual(true);
    });
  });

  describe('#setSearchTerm', function(){
    it('sentimentTrendsFactory is called', function(){
      var search = {search_term: 'Nokia'};
      ctrl.setSearchTerm(search);
      expect(sentimentTrendsFactoryMock.setSearchTerm).toHaveBeenCalled();
    });
  });

  describe('#makeSearch', function(){
    beforeEach(function(){
      var deferred = $q.defer();
      deferred.resolve({data:'some value'})
      spyOn(searchFactoryMock,'query').and.returnValue(deferred.promise);
    })

    it('searchFactory is called', function(){
      var search = {search_term: 'Nokia'};
      ctrl.makeSearch(search);
      expect(searchFactoryMock.query).toHaveBeenCalled();
    });

    it('returns the response data', function(){
      httpBackend.expectGET('partials/main-search.html').respond({data: 'Success'});
      // spyOn(searchFactoryMock,'query').and.returnValue(deferred.promise);
      // console.log(deferred.promise)
      console.log(searchFactoryMock.query('searchterm'))
      scope.$apply();
      var search = {search_term: 'Nokia'};
      ctrl.makeSearch(search);
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






});
