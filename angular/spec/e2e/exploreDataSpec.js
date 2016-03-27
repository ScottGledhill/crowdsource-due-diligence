describe("Explore data",function(){

  it("a user can explore the data to see the tweets",function(){
    browser.get("http://localhost:8000");
    element(by.model('searchTerm')).sendKeys('MacBook');
    $('#search').click();
    $('.data-link').click();
    expect(browser.getCurrentUrl()).toContain('/data');

    // The search term has been passed to the new partial page
    var searchTitle = element(by.css('.search-term'));
    expect(searchTitle.getText()).toEqual('MacBook');

    var positiveScore = element(by.css('#total-positive-score'))
    var negativeScore = element(by.css('#total-negative-score'))
    var totalMsg = parseInt(positiveScore) + parseInt(negativeScore);
    var numResults = element.all(by.css('.messages'))
    expect(numResults.count()).toBe(totalMsg);

  });
});
