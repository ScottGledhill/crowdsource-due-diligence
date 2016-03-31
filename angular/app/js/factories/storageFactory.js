doesItSuck.factory('storageFactory', ['localStorageService', function(localStorageService) {

  var STORAGE_KEY = 'resultHistory';
  var methods = { getHistory: getHistory,
                  setHistory: setHistory
  };
  return methods;


    function getHistory(resultHistory){
      var lskeys = localStorageService.keys();
      return lskeys.length < 1 ? [] : localStorageService.get(resultHistory);
    }

    function setHistory(key, value){
      localStorageService.set(key, value);
  }

}]);
