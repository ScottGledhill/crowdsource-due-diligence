describe('trendsController', function() {

var sentimentTrendsFactoryMock, ctrl, $q, rootScope, scope, results;

  beforeEach(module('DoesItSuck'));
  beforeEach(inject(function($rootScope, _$q_, $controller) {
        scope = $rootScope.$new();
        $q = _$q_;
        var deferred = $q.defer();
        deferred.resolve({data:'some value'});
        sentimentTrendsFactoryMock = {getResults: function(){} };
        results = [{searchTerm: 'Test', result: [deferred.promise, deferred.promise, deferred.promise]}];
        spyOn(sentimentTrendsFactoryMock,'getResults').and.returnValue(results);
        ctrl = $controller('trendsController', {
          $scope: scope,
          sentimentTrendsFactory: sentimentTrendsFactoryMock
        });
  }));

 describe('intialised', function(){
   it("starts with an array with three empty datapoints", function(){
     console.log(ctrl)
     expect(ctrl.data.length).toEqual(3);
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
