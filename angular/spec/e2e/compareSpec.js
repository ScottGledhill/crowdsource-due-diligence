describe("compare two searchterms",function(){


  it("submitting comparative searches",function(){
    browser.get("http://localhost:8000");
    $('#compare-link').click();
    expect(browser.getCurrentUrl()).toContain('/compare');
    var searchTermOne = element(by.model('comparison-one'));
    searchTermOne.sendKeys('Iphone 6');
    var searchTermTwo = element(by.model('comparison-two'));
    searchTermOne.sendKeys('Iphone 5');
    $('#submit-search').click();
    var searchTitle = element.all(by.css('.search-term')).first();
    expect(searchTitle.getText()).toEqual('Iphone 6');
    var searchTitleTwo = element.all(by.css('.search-term')).last();
    expect(searchTitleTwo.getText()).toEqual('Iphone 5');

  });
});
