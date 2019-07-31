(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$localStorage', 'socket', 'lodash'];

  function MainCtrl($scope, $localStorage, socket, lodash) {
    $scope.message='';
    $scope.messages=[];
    $scope.users= [];
    $scope.likes=[];


    $scope.mynickname = $localStorage.nickname;
    var nickname = $scope.mynickname;

    //register the events before the event controller to get all users. This is the client side event
    socket.emit('get-users')

    //You can display all users who have joined the conversation using socket.on event in the main controller
    socket.on('all-users', function(data){
      console.log(data);

      $scope.users = data.filter(function(item){
        return item.nickname !== nickname;
      });
    });


    socket.on('message-received', function(data){
      $scope.messages.push(data);
    })


    $scope.sendMessage= function(data){
      let newMessage = {
        message: $scope.message,
        from: $scope.mynickname
      }
      socket.emit('send-message', newMessage);
      $scope.message= '';
      // $scope.messages.push(newMessage);
    }
  };
})();