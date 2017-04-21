'use strict';

var myContacts = angular.module('myContacts', [
  'ngRoute',
  'firebase'
]).
  config(['$routeProvider', function ($routeProvider) {

    $routeProvider.
      when('/contacts', {
        templateUrl: 'views/contacts.html',
        controller: 'ContactsCtrl'
      })
      .otherwise({ redirectTo: '/contacts' });
  }]);

// Initiializing firebase
var config = {
  apiKey: "AIzaSyBcQ6jGO04dSX3UJY37FLrmHqM0kFCYoGs",
  authDomain: "mycontacts-app-c9a5a.firebaseapp.com",
  databaseURL: "https://mycontacts-app-c9a5a.firebaseio.com",
  projectId: "mycontacts-app-c9a5a",
  storageBucket: "mycontacts-app-c9a5a.appspot.com",
  messagingSenderId: "1092086535359"
};
firebase.initializeApp(config);

myContacts.controller('ContactsCtrl', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {


  var ref = firebase.database().ref();

  $scope.contacts = $firebaseArray(ref);

  $scope.showAddForm = function() {
    $scope.addFormShow = true;
  };
}])
