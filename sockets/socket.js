const {checkJWT} = require( "../helpers/jwt");

const { io } = require('../index');

const {userConnected, userDisconnected, saveMessage} = require('../controller/socket');


// Mensajes de Sockets
io.on('connection', (client) => {
    console.log('authenticating client');

     const [isValid, uid] = checkJWT(client.handshake.headers['x-token']);
     // verify authentication
     if ( !isValid ) {
         console.log('Client no valid');
         return client.disconnect();
     }
     // client 
     userConnected(uid);

     // add user to the chatroom
    client.join(uid);
    // listen msg from client
    client.on('personal-message', async(payload) => {
        await saveMessage(payload);
      console.log(payload);
        io.to(payload.for).emit('personal-message', payload);
    });
     console.log('client online');

    client.on('disconnect', () => {
        userDisconnected(uid);
        console.log('Client disconnected');
    });

    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
