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


  var ref = firebase.database().ref('/contacts');

  $scope.contacts = $firebaseArray(ref);

  // Handles showing the form to add a new contact
  // Shows form
  $scope.showAddForm = function () {
    $scope.addFormShow = true;
  };
  // Hides Form
  $scope.hideAddForm = function () {
    $scope.addFormShow = false;
  };
  // Handles submitting data from the form
  $scope.addFormSubmit = function () {

    //  Assigning values to form data

    if ($scope.name) { var name = $scope.name } else { var name = null; }
    if ($scope.email) { var email = $scope.email } else { var email = null; }
    if ($scope.company) { var company = $scope.company } else { var company = null; }
    if ($scope.home_phone) { var home_phone = $scope.home_phone } else { var home_phone = null; }
    if ($scope.mobile_phone) { var mobile_phone = $scope.mobile_phone } else { var mobile_phone = null; }
    if ($scope.work_phone) { var work_phone = $scope.work_phone } else { var work_phone = null; }
    if ($scope.street_address) { var street_address = $scope.street_address } else { var street_address = null; }
    if ($scope.city) { var city = $scope.city } else { var city = null; }
    if ($scope.state) { var state = $scope.state } else { var state = null; }
    if ($scope.zip_code) { var zip_code = $scope.zip_code } else { var zip_code = null; }

    //  building object

    $scope.contacts.$add({
      name: name,
      email: email,
      company: company,
      phones: [
        {
          home: home_phone,
          mobile: mobile_phone,
          work: work_phone,
        }
      ],
      address: [
        {
          street: street_address,
          city: city,
          state: state,
          zipcode: zip_code
        }
      ]
    }).then(function (ref) {
      var id = ref.key;
      console.log("Added contact with id " + id);


      // Clearing input fields
      clearFields();
      // Hide form
      $scope.addFormShow = false;
      // Confirmation message
      $scope.msg = "Contact Added";
    });
  };
  // Showing more contact details
  $scope.showContact = function (contact) {
    $scope.name = contact.name;
    $scope.email = contact.email;
    $scope.company = contact.company;
    $scope.home_phone = contact.phones[0].home;
    $scope.mobile_phone = contact.phones[0].mobile;
    $scope.work_phone = contact.phones[0].work;
    $scope.street_address = contact.address[0].street;
    $scope.city = contact.address[0].city;
    $scope.state = contact.address[0].state;
    $scope.zip_code = contact.address[0].zipcode;

    $scope.contactShow = true;
  };

  // Clear input fields functon
  function clearfields() {
    $scope.name = "";
    $scope.email = "";
    $scope.company = "";
    $scope.home_phone = "";
    $scope.mobile_phone = "";
    $scope.work_phone = "";
    $scope.street_address = "";
    $scope.city = "";
    $scope.state = "";
    $scope.zip_code = "";
  };
}]);
