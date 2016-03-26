

xdescribe("searchTerm",function(){

  beforeEach(function() {
    browser.addMockModule('httpMocker', function() {
      angular.module('httpMocker', ['ngMockE2E'])
      .run(function($httpBackend) {
        $httpBackend.whenPOST(
            'http://localhost:3000/search', {search_term: 'MacBook'})
            .respond(
              {
                search_term: 'MacBook',
                positive: 4,
                neutral: 1,
                negative: 50
                            }
            )
      })
    })
  });

  var userSearch = function(){
    browser.get("http://localhost:8000");
    element(by.model('searchTerm')).sendKeys('MacBook');
    $('#search').click();
  }


  it("a user can search for a keyword and submit",function(){
    userSearch();
    var searchTitle = element(by.css('.search-term'));
    expect(searchTitle.getText()).toEqual('MacBook');
  });

  it('returns the sentiment results', function(){
    userSearch();
    expect(element.all(by.css('.negative-result')).first().getText()).toEqual('50')
  });


});
