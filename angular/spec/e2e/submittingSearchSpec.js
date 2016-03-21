describe("searchTerm",function(){
  it("a user can search for a keyword and submit",function(){
    browser.get("http://localhost:8000");
    var searchTerm = element(by.model('searchCtrl.searchTerm'));
    searchTerm.sendKeys('MacBook');
    $('#search').click();
    expect(searchTerm.getText()).toEqual("");
    var searchTitle = element(by.css('h3'));
    expect(searchTitle.getText()).toEqual('MacBook');
  });
});
