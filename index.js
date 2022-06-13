const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require('dotenv').config();


// DB Config
const { dbConnection } = require('./database/config');
dbConnection();

// App de Express
const app = express();

// Lectura y parseo del body
app.use(express.json());
// body-parse
app.use(bodyParser.urlencoded({extended: true}));

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
// File upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));

// Mis Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/uploads', require('./routes/uploads'));


  server.listen(process.env.PORT, '192.168.31.226', (err) => {
 // server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Server running on port', process.env.PORT );

});


