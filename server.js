// Require libraries and credentials
const express = require('express');
const app = express();
// const socket = require('socket.io');
const mongoose = require('mongoose');
const config = require('./config');
const PORT = config.PORT;
const MONGODB_URI = config.MONGODB_URI;

// Require files
const submissionsRouter = require('./routes/submissions.js')

// Connect to the database
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))
app.use(express.json())
app.use(express.urlencoded({extended:true}));

// Setup Routing
// main route
app.use(express.static('public'));
// api routes
app.use('/submission', submissionsRouter);

// App server setup
const server = app.listen(PORT, function () {
    //const server = app.listen(8080, function () {
    console.log("Server is running")
});

// // App socket setup (backend)
// var io = socket(server);

// // When the a socket connection is made
// io.on('connection', function (socket) {

//     // when a client first connects
//     console.log("a new client has connected, id: ", socket.id);


//     // when a client disconnects
// 	socket.on('disconnect', function() {
//         console.log("Client has disconnected " + socket.id);
//     });
// });