doesItSuck.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl:'partials/main-search.html',
        controller: 'searchController',
        controllerAs: 'searchCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about.html'
      }).
      when('/data', {
        templateUrl: 'partials/explore-data.html',
        controller: 'dataController',
        controllerAs: 'dataCtrl'
      }).
      when('/trends', {
        templateUrl: 'partials/sentiment-trends.html',
        controller: 'trendsController',
        controllerAs: 'trendsCtrl'
      }).
      when('/search-dates', {
        templateUrl: 'partials/specific-dates.html',
        controller: 'specificSearchController',
        controllerAs: 'searchCtrl'
      }).
      when('/comparison', {
        templateUrl: 'partials/compare.html',
        controller: 'compareController',
        controllerAs: 'compareCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
