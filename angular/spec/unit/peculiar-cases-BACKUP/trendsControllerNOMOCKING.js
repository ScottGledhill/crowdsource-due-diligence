describe('trendsController', function() {

var sentimentTrendsFactoryMock, ctrl, $q, response, rootScope, scope, httpBackend;

  beforeEach(function(){
    response = {data:{test: 'tester'}}
    sentimentTrendsFactoryMock = jasmine.createSpyObj(
      'sentimentTrendsFactoryMock',
      ['getResults']);

    module('DoesItSuck', function(){
      sentimentTrendsFactory: sentimentTrendsFactoryMock
    });
  });

  beforeEach(inject(function( $controller, $q, _$rootScope_){
    var deferred = $q.defer();
    deferred.resolve(response);
    sentimentTrendsFactoryMock.getResults.and.returnValue(deferred.promise);
        ctrl = $controller('trendsController');
        scope = _$rootScope_;
 }));

 describe('intialised', function(){
   it("starts with an empty array", function(){
     expect(ctrl.results.length).toEqual(0);
   });

 });

 describe('#getResults', function(){
   it('sentimentTrendsFactory is called when initialised', function(){
     console.log(ctrl);
     console.log(sentimentTrendsFactoryMock);
     scope.$digest();
    // console.log(sentimentTrendsFactoryMock);
     expect(sentimentTrendsFactoryMock.getResults).toHaveBeenCalled();
   });

   it('sentimentTrendsFactory is called', function(){
     scope.$digest();
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
