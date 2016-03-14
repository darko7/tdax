
angular.module('evenhire.allJobs', [])

  .controller('AllJobsController', ['$scope', '$state', 'Applicant', function ($scope, $state, Applicant) {
    $scope.fetchedJobs = [];

    $scope.getAllJobs = function() {
      Applicant.allJobs()
        .then(function(data) {
          console.log(data);
          $scope.fetchedJobs = data;
        });
    }();

    $scope.submitApplication = function(job_id) {
      Applicant.apply({job_id: job_id})
        .then(function(factoryResponse) {
          console.log("factoryResponse in alljobsController", factoryResponse);
          if(factoryResponse.status === 500){
            console.log("You need to login");
            $state.go('appLogin')
          } else if(factoryResponse.toString() === 'false') {
            alert("You already applied for that job")
          } else if (!factoryResponse) {
            alert("You need to be logged in as an applicant to apply to a job")
          } else {
            alert("Thanks for applying " + factoryResponse.first_name)
          }
      });
    };
}]);
