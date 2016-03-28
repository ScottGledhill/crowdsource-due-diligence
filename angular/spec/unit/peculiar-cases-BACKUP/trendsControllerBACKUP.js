describe('trendsController', function() {

var sentimentTrendsFactoryMock, ctrl, $q, rootScope, scope, httpBackend;

  beforeEach(function(){
    module('DoesItSuck');
      inject(function(_$rootScope_, _$q_, $controller, $httpBackend){
        sentimentTrendsFactoryMock = {getResults: function(){} };
        scope = _$rootScope_;
        $q = _$q_;
        httpBackend = $httpBackend;
        ctrl = $controller('trendsController', {
          $scope: scope,
          sentimentTrendsFactory: sentimentTrendsFactoryMock});
          console.log(ctrl);

       })
 });

 describe('intialised', function(){
   it("starts with an empty array", function(){
     expect(ctrl.results.length).toEqual(0);
   });

 });

 describe('#getResults', function(){
   beforeEach(function(){
     httpBackend.expectGET('partials/main-search.html').respond({data: 'Success'});
     var deferred = $q.defer();
     deferred.resolve({data:'some value'})
     spyOn(sentimentTrendsFactoryMock,'getResults').and.returnValue( [deferred.promise, deferred.promise, deferred.promise] );

     scope.$digest();
   })

   it('sentimentTrendsFactory is called when initialised', function(){
     expect(sentimentTrendsFactoryMock.getResults).toHaveBeenCalled();
   });

   it('sentimentTrendsFactory is called', function(){
    //  scope.$digest();
    //  ctrl.getResults();
     expect(sentimentTrendsFactoryMock.getResults).toHaveBeenCalled();
   });

   it('returns the response data', function(){
    //  ctrl.getResults();
    //  scope.$apply();
     expect(ctrl.results.length).toEqual(3);
     expect(ctrl.results).toContain('some value')
   });
 });


});
