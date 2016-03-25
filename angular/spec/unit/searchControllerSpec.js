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
      ctrl.multiDaySearches(searchTerm);
      expect(ctrl.searches.length).toEqual(3);
    });

    it('it sets the correct dates for each search', function(){
      var dates = ['2016-03-20','2016-03-21'];
      var dateCall = {search_term: 'Nokia', date_from: '2016-03-20', date_till: '2016-03-21' }
      ctrl.multiDaySearches(dates,searchTerm);
      expect(searchFactoryMock).toHaveBeenCalledWith(dateCall);
    })
  });

  describe('#weekSearch', function(){
    it('inserts the current search findings into the weekSearch array', function(){
      var search = {search_term: 'Nokia'};
      ctrl.weekSearch(search);
      expect(ctrl.weekResults).toContain(search);
    });

    it('starts the multiDaySearches', function(){
      var search = {search_term: 'Nokia'};
      ctrl.weekSearch(search);
      expect(searchFactoryMock).toHaveBeenCalled();
    });
  })

  describe('#getDates', function(){
    it('returns the dates 7 and 6 days ago in the right format', function(){
      var dateRange = [7, 6, 0];
      expect(ctrl.getDates(dateRange).length).toEqual(3);
    });
  })




});
