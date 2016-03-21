describe('searchController', function() {

  beforeEach(module('DoesItSuck'));
  var ctrl;


  beforeEach(inject(function($controller){
     ctrl = $controller('searchController');
   }));


  describe('#toggleResultStatus', function() {

    it('changes resultReady boolean', function() {
      ctrl.toggleResultStatus();
      expect(ctrl.isResultReady()).toEqual(true);
    });

    it('starts with not showing the page', function() {
      expect(ctrl.isResultReady()).toEqual(false);
    });

  });


});
