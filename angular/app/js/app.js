var doesItSuck = angular.module('DoesItSuck', ['ngResource', 'ngMockE2E'])
  .run(function($httpBackend) {
    $httpBackend.whenPOST(
      'localhost:3000/twitter/create')
      .respond(
        {
          search_term: 'Nokia',
          positive: 4,
          neutral: 1,
          negative: 50
                      }
      )
  })
