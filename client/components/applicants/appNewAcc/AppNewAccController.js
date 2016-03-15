angular.module('evenhire.appNewAcc', [])

  .controller('AppNewAccController', ['$scope', '$state','$http','Applicant','$window', 'Auth', function ($scope, $state, $http, Applicant, $window, Auth) {

    $scope.applicant = {};

    $scope.createAccount = function() {
      //send form data to the server at api/applicants/login
      Auth.signUp($scope.applicant, 'applicant')
        .then(function(data) {
          if (!data.type) {
            console.log('User already exists', data.data);
          } else {
            $window.localStorage.setItem('evenhire', data.token);
            console.log('NEW USER is :', data);
            $state.go('allJobs');
          }
      });
    };

  }]);

