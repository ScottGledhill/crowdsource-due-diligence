doesItSuck.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl:'partials/main-search.html',
        // controller: 'searchController as searchCtrl'
      }).
      when('/sentiment-trends', {
        templateUrl: 'partials/sentiment-trends.html',
        // controller: 'searchController as searchCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
