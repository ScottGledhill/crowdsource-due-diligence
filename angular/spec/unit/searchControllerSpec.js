describe('searchController', function() {

var searchFactoryMock;

  beforeEach(function() {
    searchFactoryMock = jasmine.createSpy('searchFactory');
    module('DoesItSuck', {
      searchFactory: searchFactoryMock
    });
  });
  var ctrl, searchTerm;


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

  describe('multiDaySearches', function(){
    beforeEach(function(){
      searchTerm = {search_term: 'Nokia'};
    });

    it('makes 6 searches for the last 7 and stores it in the results', function(){
      var days = [0,1,2,3,4,5,6];
      ctrl.multiDaySearches(days, searchTerm);
      expect(ctrl.searches.length).toEqual(days.length-1);
    });

    it('it sets the correct dates for each search', function(){
      var dates = ['2016-03-20','2016-03-21'];
      var dateCall = {search_term: 'Nokia', date_from: '2016-03-20', date_till: '2016-03-21' }
      ctrl.multiDaySearches(dates,searchTerm);
      expect(searchFactoryMock).toHaveBeenCalledWith(dateCall);
    })
  });




});
