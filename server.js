const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 8080;
let users = [];   //stores the users that have joined the conversation

app.use(express.static(path.join(__dirname, "public")));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


io.on('connection', function(socket) {
  console.log('new connection made');

  //show all users when logged on
  //socket.emit is used to prevent broadcasting the event, 
  //therefore, it is passed to the socket that made the initial connection
  socket.on('get-users', function(){
    socket.emit('all-users', users);  
  });

  //when new socket joins
  socket.on('join', function(data){
    console.log(data);  //nickname
    console.log(users); 

    //creating a reference to the socket
    socket.nickname = data.nickname;

    //to track users add users of socket.nickname to the join socket
    users[socket.nickname] = socket;

    //create a users object with two properties, a name and a unique id
    let userObj = {
      nickname: data.nickname,
      socketid: socket.id    //automatically created and attached to every instance of a socket object
    };

    //push the object into the users array
    users.push(userObj);


    //emit a new event called all-users
    io.emit('all-users', users);
  });


  //Broadcast message
  socket.on('send-message', function(data){
    // socket.broadcast.emit('message-received', data);
    io.emit('message-received', data);
  });


  //Send a new like to a user of your choice
  socket.on('send-like', function(data){
    console.log(data);

    socket.broadcast.to(data.like)
    .emit('user-liked', data);
  })

});

server.listen(port, function() {
  console.log("Listening on port " + port);
});
