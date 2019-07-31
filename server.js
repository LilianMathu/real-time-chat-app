const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 8080;

app.use(express.static(path.join(__dirname, "public")));
// app.use('/bower_components',  express.static(__dirname + '/bower_components'));


io.on('connection', function(socket) {
  console.log('new connection made');

});

server.listen(port, function() {
  console.log("Listening on port " + port);
});
