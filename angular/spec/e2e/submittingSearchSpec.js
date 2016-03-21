describe("searchTerm",function(){

  // beforeEach(function() {
  //   httpMocker = angular.module('httpMocker', ['DoesItSuck','ngMockE2E']);
  //   httpMocker
  //
  //   });

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
