require('dotenv').config()
const axios = require('axios');
var io = require('socket.io-client');
var socket = io.connect("http://localhost:4000/", {
    reconnection: true
});

socket.on('connect', function () {
    console.log('connected to localhost:3000');
    socket.on('clientEvent', function (data) {
        console.log('message from the server:', data.uuid);
        // console.log("header: ", data.request.header);
        // console.log("body: ", data.request.body);
        // console.log("Method: ", data.request.method);
        if(data.request.method === "GET") {
            axios.get(process.env.TARGET_BASE + data.request.path, {headers : data.request.header})
                .then(function (response) {
                    // handle success
                    console.log(response.data);
                    socket.emit('serverEvent', {"uuid" : data.uuid, "response" : response.data, "headers" : response.headers});
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    socket.emit('serverEvent', {"uuid" : data.uuid, "response" : "Error"});
                })

        }

        if(data.request.method === "POST") {
            console.log("path: " +  data.request.path);
            console.log("body:" +  data.request.body);
            console.log("headers:" +  data.request.header);
            console.log(process.env.TARGET_BASE + data.request.path, data.request.body, {headers : data.request.header})
            axios.post(process.env.TARGET_BASE + data.request.path, data.request.body, {headers : data.request.header})
                .then(function (response) {
                    // handle success
                    // console.log(response.data);
                    socket.emit('serverEvent', {"uuid" : data.uuid, "response" : response.data, "headers" : response.headers});
                })
                .catch(function (error) {
                    // handle error
                    // console.log(error);
                    socket.emit('serverEvent', {"uuid" : data.uuid, "response" : "Error"});
                });

        }
        
    });
});