'use strict';

angular.module('myContacts', [
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.otherwise({redirectTo: '/contacts'});
}]);
