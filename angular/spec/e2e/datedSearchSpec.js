describe("searchTerm",function(){

  var dateFrom, dateTo;

  beforeEach(function() {
    dateFrom = '2014-03-22';
    dateTo = '2014-03-24';
    browser.addMockModule('httpMocker', function() {
      angular.module('httpMocker', ['ngMockE2E'])
      .run(function($httpBackend) {
        $httpBackend.whenPOST(
            'http://localhost:3000/search', {search_term: 'MacBook', date_from: dateFrom, date_to: dateTo })
            .respond(
              {
                search_term: 'MacBook',
                date_from: dateFrom,
                date_to: dateTo,
                positive: 4,
                neutral: 1,
                negative: 50
                            }
            )
      })
    })
  });

  var userSearchByDate = function(){
    browser.get("http://localhost:8000");
    element(by.model('searchTerm')).sendKeys('MacBook');
    element(by.model('fromDate')).sendKeys(dateFrom);
    element(by.model('fromTo')).sendKeys(dateTo);
    $('#search').click();
  }

  it("a user can search for a keyword and submit",function(){
    userSearchByDate();
    var searchTimeFrame = element(by.css('.search-time-frame'));
    expect(searchTimeFrame.getText()).toEqual(dateFrom + " to " + dateTo);
  });
});
