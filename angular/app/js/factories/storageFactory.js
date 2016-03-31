doesItSuck.factory('storageFactory', storageFactory);
  storageFactory.$inject = ['localStorageService'];
  function storageFactory(localStorageService) {

  var STORAGE_KEY = 'resultHistory';
  var searchResult;
  var service = { getHistory: getHistory,
                  setHistory: setHistory,
                  setSearchResult: setSearchResult,
                  getSearchResult: getSearchResult
  };
  return service;

  function getHistory(resultHistory){
    var lskeys = localStorageService.keys();
    return lskeys.length < 1 ? [] : localStorageService.get(resultHistory);
  }

  function setHistory(key, value){
    localStorageService.set(key, value);
  }

  function setSearchResult(input){
    searchResult = input;
  }

  function getSearchResult(){
    return searchResult;
  }
}
