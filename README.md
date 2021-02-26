This project is created to create a socket connection between two servers. 
After creating the socket connection between two servers 
1. server 
2. client

We can send a http request to the server and then this server will send the http data to the client (which is also a backend server) client will create http request based on the provided payload and request the target server and recieve the response and return to the original server as data through the socket connection. 

This setup can be used to execute some web services in the local server and with a remote server we can use the local web service. 

Example usage is 

Lets say your are developing a webservice in your local laptop. There are some set of tests on a thrid party tester you need to run on your webservices but you dont have a public ip enabled for your local machine. Now its easy if you can test your local code in terms of debugging purposes. But without public ip a thrid party application can't make any requests to your local server. Using this project we create a socket between a remote server and local machine. Now you just need to point the remote server to the thrid party testing platform. That will call the remote server, then this remote server will send the data to the local client through the socket connection. Then this local client make a http request to locally running web service and return response. Then it will send the response back to remote server. Then this remote server will prepare the response and send it back to the thrid party tester.
