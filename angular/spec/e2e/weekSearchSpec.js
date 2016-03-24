describe("searchTerm",function(){

// var dateFrom, dateTo;

  beforeEach(function() {

    browser.addMockModule('httpMocker', function() {
      angular.module('httpMocker', ['ngMockE2E'])
      .run(function($httpBackend) {
        $httpBackend.whenPOST(
            'http://localhost:3000/search')
            .respond(
              {
                search_term: 'MacBook',
                date_from: '2016-03-23',
                date_to: '2016-03-24',
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
    $('#week-search').click();
    element(by.model('searchTerm2')).sendKeys('MacBook');
    $('#search2').click();
  }

  it("a user can see the results for each day of the week",function(){
    userSearchByDate();
    var results = element(by.css('#week-search-container')).all(by.css('.result-item'))
    expect(results.count()).toEqual(6)

  });
});
