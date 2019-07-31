// start with an IIFE  to create a container around the variables
(function() {
  'use strict';

  angular
    .module('app')
    .controller('JoinCtrl', JoinCtrl);

  JoinCtrl.$inject = ['$location', '$scope', '$localStorage', 'socket'];  // $inject injects the dependencies to be used

  function JoinCtrl($location, $scope, $localStorage, socket) {
    $scope.name='';
    var nickname;
     $scope.join = function(){
       nickname=$scope.name;
       $localStorage.nickname=$scope.name;

      socket.emit('join', {
        nickname: nickname
      })
       $location.path('/main');
     }
  }
})();