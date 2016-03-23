var doesItSuck = angular.module('DoesItSuck', ['ngResource']);

doesItSuck.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
