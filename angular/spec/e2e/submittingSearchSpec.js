describe("searchTerm",function(){

  beforeEach(function() {
    browser.addMockModule('httpMocker', function() {
      angular.module('httpMocker', ['ngMockE2E'])
      .run(function($httpBackend) {
        $httpBackend.whenPOST(
            'localhost:3000/twitter/create', 'MacBook')
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
    var searchTitle = element(by.css('h3'));
    expect(searchTitle.getText()).toEqual('MacBook');
  });

  xit('the search term is taken out after the user clicks submit', function(){
    userSearch();
    var searchTerm = element(by.model('searchTerm'));
    expect(searchTerm.getAttribute('value')).toEqual("");
  });


  it('returns the sentiment results', function(){
    userSearch();
    var positiveResult = element(by.css('#positive-result'));
    expect(positiveResult.getText()).toEqual('4');
    expect(element(by.css('#neutral-result')).getText()).toEqual('1')
    expect(element(by.css('#negative-result')).getText()).toEqual('50')

  });


});
