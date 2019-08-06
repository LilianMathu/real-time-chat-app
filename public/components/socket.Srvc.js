
(function() {
  'use strict';

  angular
    .module('app')
    .factory('socket', socket);

  socket.$inject = ['$rootScope']; //rootScope is used because angular 1 does not intercept web sockets data coming from the browser

  function socket($rootScope) {
    var socket = io.connect();  //opens socket.io connections between the browser and the server
    return {
      on: on,    
      emit: emit
    }
    // Socket 'on' and 'emit' methods here
    // On method will listens to incoming events for a given name and then issue a callback performing some action
    function on(eventName, callback){    
      socket.on(eventName, function(){
        var args = arguments;
        $rootScope.$apply(function(){
          callback.apply(socket, args);
        });
      });
    };

    //emit method sends socket events to the server to be received
    function emit(eventName, data, callback){
      socket.emit(eventName, data, function(){
        var args = arguments;
        $rootScope.$apply(function () {
          if(callback) {
            callback.apply(socket, args);
          }
        });
      });
    };
  };
})();