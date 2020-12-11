//import http module
// const http = require('http');

//import express module
const express = require('express');
//create instance of an express application
const app = express();

//declare the hostName we want to connect to
// const hostname = '127.0.0.1';
//declare the port we want to connect to
const port = 3000;

//create a server
// const server = http.createServer((request, response) => {
//     //set the response headers as 200 OK and the content type as text/plain
//     response.writeHead(200, {'Content-Type':'text/plain'});
//     //send the respond body 'Hello world'
//     response.end('Hello world\n');
// });

//opening up our server to listen on a specific ip address and port
//ip addresses are also known as hostnames
// server.listen(port, hostname, () => {
//     console.log('The server is running at ' + hostname + ':' + port);
// });
app.listen(port, () => {
    console.log('The Express server is running at port ' + port);
});

//first api call
app.get('/', (request, response) => {
    response.send('Hello world of Express!');
});
 
app.get('/name', (request, response) => {
    response.send('<h1>Bob</h1>');
});

// app.get('/list', (request, response) => {

// });

// app.post
// app.put
// app.delete('/some/path', (request, response) => {});