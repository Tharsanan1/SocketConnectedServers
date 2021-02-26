const express = require('express');
const app = express();
const port = 3000;
const socketPort = 4000;
const { v4: uuidv4 } = require('uuid');


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

console.log("proceeding to create sockets");

const responseMap = {};

var io = require('socket.io')(socketPort);
io.on('connection', function (socket) {
    console.log('connected:', socket.client.id);
    socket.on('serverEvent', function (data) {
        console.log('new message from client:', data);
        responseMap[data.uuid] = data.response;
    });
    app.all('*', (req, res) => {
        const uuid = uuidv4();
        console.log('Going to send message to client');
        console.log("method: ", req.method, req.originalUrl);
        socket.emit('clientEvent', {"uuid" : uuid, "request" : {"header" : req.headers, "body" : req.body, "method" : req.method, "path" : req.originalUrl}});
        console.log('message sent to the clients');
        setInterval(function () {
            if(responseMap[uuid]) {
                res.send(responseMap[uuid]);
                delete responseMap[uuid];
            }
        }, 100);
        
    });
});