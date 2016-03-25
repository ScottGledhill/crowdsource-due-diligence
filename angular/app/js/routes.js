doesItSuck.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl:'partials/main-search.html',
        controller: 'searchController',
        controllerAs: 'searchCtrl'
      }).
      when('/sentiment-trends', {
        templateUrl: 'partials/sentiment-trends.html',
        controller: 'trendsController',
        controllerAs: 'trendsCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
