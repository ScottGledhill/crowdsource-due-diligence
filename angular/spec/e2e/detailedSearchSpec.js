describe("detailed search",function(){

  it("a user can get details for the searchterm ",function(){
    browser.get("http://localhost:8000");
    element(by.model('searchTerm')).sendKeys('MacBook');
    $('#search').click();
    var searchTitle = element(by.css('.search-term'));
    expect(searchTitle.getText()).toEqual('MacBook');

    $('.sentiment-trends-link').click();
    expect(browser.getCurrentUrl()).toContain('/sentiment-trends');

    var numResults = element.all(by.css('.result-item'))
    expect(numResults.count()).toEqual(3);

  });
});
