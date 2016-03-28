xdescribe("persisting search",function(){

  it("submitting a specific searchword",function(){
    browser.get("http://localhost:8000");
    var searchTerm = element(by.model('searchTerm'));
    searchTerm.sendKeys('MacBook');
    $('#submit-search').click();

    // The search contains the searhterm
    var searchTitle = element(by.css('.search-term'));
    expect(searchTitle.getText()).toEqual('MacBook');

    $('.data-link').click();
    $('#search').click()

    // The searchterm is still visible
    var searchTitle = element(by.css('.search-term'));
    expect(searchTitle.getText()).toEqual('MacBook');
  });



});
