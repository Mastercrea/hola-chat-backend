const { checkJWT } = require("../helpers/jwt");

const { io } = require('../index');

const { userConnected, userDisconnected, saveMessage } = require('../controller/socket');


// Socket's messages
io.on('connection', (client) => {
    // console.log('authenticating client');

    const [isValid, uid] = checkJWT(client.handshake.headers['x-token']);
    // verify authentication
    if (!isValid) {
       //  console.log('Client no valid');
        return client.disconnect();
    }
    // client 
    userConnected(uid).then((_) => {
        // broadcast user connected
        io.emit('new-user-status');
    });
    // add user to the chatroom
    client.join(uid);
    // listen msg from client
    client.on('personal-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.for).emit('personal-message', payload);
        io.to(payload.for).emit('personal-notification', payload);
    });
    console.log('client online');

    client.on('disconnect', () => {
        userDisconnected(uid).then((_) => {
            io.emit('new-user-status');
        });
        console.log('Client disconnected');
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
