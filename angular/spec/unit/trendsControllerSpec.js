describe('trendsController', function() {

var sentimentTrendsFactoryMock, ctrl, $q, rootScope, scope;

  beforeEach(module('DoesItSuck'));
  beforeEach(inject(function($controller, $rootScope, _$q_) {
        scope = $rootScope.$new();
        $q = _$q_;
        var deferred = $q.defer();
        deferred.resolve({data:'some value'})
        sentimentTrendsFactoryMock = {getResults: function(){} };
        spyOn(sentimentTrendsFactoryMock,'getResults').and.returnValue([deferred.promise, deferred.promise, deferred.promise] );
        ctrl = $controller('trendsController', {
          $scope: scope,
          sentimentTrendsFactory: sentimentTrendsFactoryMock
        });
  }));

 describe('intialised', function(){
   it("starts with an empty array", function(){
     expect(ctrl.results.length).toEqual(0);
   });

 });

 describe('#getResults', function(){

   it('sentimentTrendsFactory is called when initialised', function(){
     expect(sentimentTrendsFactoryMock.getResults).toHaveBeenCalled();
   });

   it('returns the response data', function(){
     scope.$digest();
     expect(ctrl.results.length).toEqual(3);
     expect(ctrl.results).toContain('some value')
   });
 });
});
