describe('trendsController', function() {

var sentimentTrendsFactoryMock, ctrl, $q, rootScope, scope;

  beforeEach(module('DoesItSuck'));
  beforeEach(inject(function($controller, $rootScope, _$q_, $httpBackend) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        $q = _$q_;
        var deferred = $q.defer();
        deferred.resolve({data:'some value'})
        sentimentTrendsFactoryMock = {getResults: function(){} };
        spyOn(sentimentTrendsFactoryMock,'getResults').and.returnValue([deferred.promise, deferred.promise, deferred.promise] );
        ctrl = $controller('trendsController', {
          $scope: scope,
          sentimentTrendsFactory: sentimentTrendsFactoryMock});

       })
 );

 describe('intialised', function(){
   it("starts with an empty array", function(){
     expect(ctrl.results.length).toEqual(0);
   });

 });

 describe('#getResults', function(){
   beforeEach(function(){
     httpBackend.expectGET('partials/main-search.html').respond({data: 'Success'});
   })

   it('sentimentTrendsFactory is called when initialised', function(){
     scope.$digest();
     expect(sentimentTrendsFactoryMock.getResults).toHaveBeenCalled();
   });


   it('returns the response data', function(){
     scope.$apply();
     expect(ctrl.results.length).toEqual(3);
     expect(ctrl.results).toContain('some value')
   });
 });
});
