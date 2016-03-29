xdescribe("Explore data",function(){

  it("a user can explore the data to see the tweets",function(){
    browser.get("http://localhost:8000");
    element(by.model('searchTerm')).sendKeys('iPhone');
    $('#submit-search').click();
    $('.data-link').click();
    expect(browser.getCurrentUrl()).toContain('/data');

    // The search term has been passed to the new partial page
    var searchTitle = element(by.css('.search-term'));
    var positiveScore = element(by.css('#total-positive-score')).getText()
    expect(searchTitle.getText()).toEqual('iPhone');
    expect(positiveScore).not.toBe(undefined)

    // There are currently three messages being sent
    var numResults = element.all(by.css('.messages'))
    expect(numResults.count()).toBe(3);

  });
});
