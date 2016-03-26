angular.module('mock.trends', []).
    factory('sentimentTrendsFactory', function($q) {
        var trendsFactory = {};

        trendsFactory.getResults = function(){
          var deferred = $q.defer();
          deferred.resolve({data:'some value'})
          return [deferred.promise];
          }
          return trendsFactory;
        });


describe('trendsController', function() {

var ctrl, httpBackend, scope;

  beforeEach(module('DoesItSuck'));
  beforeEach(module('mock.trends'));
  beforeEach(inject(function($controller, $rootScope, $httpBackend, _sentimentTrendsFactory_) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        ctrl = $controller('trendsController', {
          $scope: scope,
          sentimentTrendsFactory: _sentimentTrendsFactory_});

       }));

 describe('intialised', function(){
   it("starts with an empty array", function(){
     expect(ctrl.results.length).toEqual(0);
   });

 });

 describe('#getResults', function(){

   it('returns the response data', function(){
     httpBackend.expectGET('partials/main-search.html').respond({data: 'Success'});
     scope.$apply();
     expect(ctrl.results).toContain('some value')
   });
 });


});
