This is a reverse proxy implementation. Using this project one can expose locally running web application to internet without having a public/static ip address to his local machine. But we need a remote server. 

Idea : 

A socket server will be deployed to a remote server(this remote server has a public IP). Client server will be deployed at our local machine. When starting up both server and client, client application will create a socket tunnel. When remote server gets a requesty it will encode the request with all the details and send it to the client machine as a string. Client server will recieve the request and prepare a http request according to the request string and get response from locally running services, the recieved responses will be communicated back with server application. Server application will send the response to users.


Example usage of this program : 

Lets say you are developing a webservice in your local machine and you dont have a public/static IP attached to your machine. If you have a remote server you can use this program to expose your locally running webservices to internet by deployi8ng client program to the local machine and server program to the remote machine. 


After implementing this program, I ve found that theres a similar and more robust software, we can use: Have a look at https://ngrok.com/
