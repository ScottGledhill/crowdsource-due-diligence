describe('searchController', function() {

  beforeEach(module('DoesItSuck'));
  var ctrl;


  beforeEach(inject(function($controller){
     ctrl = $controller('searchController');
   }));


  describe('#setResultStatus', function() {

    it('starts with not showing the page', function() {
      expect(ctrl.isResultReady()).toEqual(false);
    });

    it('changes resultReady boolean', function() {
      ctrl.setResultStatus();
      expect(ctrl.isResultReady()).toEqual(true);
    });

  });


});
