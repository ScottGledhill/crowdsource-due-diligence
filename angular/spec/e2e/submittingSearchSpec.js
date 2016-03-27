

xdescribe("searchTerm",function(){

  // beforeEach(function() {
  //   browser.addMockModule('httpMocker', function() {
  //     angular.module('httpMocker', ['ngMockE2E'])
  //     .run(function($httpBackend) {
  //       $httpBackend.whenPOST(
  //           'http://localhost:3000/search', {search_term: 'MacBook'})
  //           .respond(
  //             {
  //               search_term: 'MacBook',
  //               positive: 4,
  //               neutral: 1,
  //               negative: 50
  //                           }
  //           )
  //     })
  //   })
  // });

  it("submitting a specific searchword",function(){
    browser.get("http://localhost:8000");
    var searchTerm = element(by.model('searchTerm'));
    searchTerm.sendKeys('MacBook');
    $('#search').click();

    // The searchbar is cleared after searching
    expect(searchTerm.getAttribute('value')).toEqual('')

    // The search contains the searhterm
    var searchTitle = element(by.css('.search-term'));
    expect(searchTitle.getText()).toEqual('MacBook');

    // Emojis are shown for each search
    var emojis = element.all(by.css('.emoji'))
    expect(emojis.count()).toEqual(3);



  });



});
