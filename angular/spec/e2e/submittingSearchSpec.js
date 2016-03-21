describe("searchTerm",function(){

  beforeEach(function() {
    browser.addMockModule('httpMocker', function() {
      angular.module('httpMocker', ['ngMockE2E'])
      .run(function($httpBackend) {
        $httpBackend.whenPOST(
            'localhost:3000/twitter/create')
            .respond(
              {
                search_term: 'Nokia',
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
    element(by.model('searchCtrl.searchTerm')).sendKeys('MacBook');
    $('#search').click();
  }

  it("a user can search for a keyword and submit",function(){
    userSearch();
    var searchTerm = element(by.model('searchCtrl.searchTerm'));
    expect(searchTerm.getText()).toEqual("");
    var searchTitle = element(by.css('h3'));
    expect(searchTitle.getText()).toEqual('MacBook');
  });

  it('returns the sentiment results', function(){
    userSearch();
    var positiveResult = element(by.css('#positiveResult'));
    expect(positiveResult.getText()).toEqual('4');

  });


});
