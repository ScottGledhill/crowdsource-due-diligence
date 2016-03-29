describe("compare two searchterms",function(){


  it("submitting a specific searchword",function(){
    browser.get("http://localhost:8000");
    var searchTerm = element(by.model('searchTerm'));
    searchTerm.sendKeys('MacBook');
    $('#submit-search').click();

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
