const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = '19532019098-mg8cr2u8qfss7n6vpkq15aofl38m9ims.apps.googleusercontent.com';

const client = new OAuth2Client(CLIENT_ID);

const varlidateGoogleIdToken = async (token) => {

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: [CLIENT_ID,
                '19532019098-8rng7l3h89in2btfii3lcsjt0208pod7.apps.googleusercontent.com'
            ]
            // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();

        console.log('======== Payload =========');
        console.log(payload);
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
        return {
            name: payload['name'],
            picture: payload['picture'],
            email: payload['email'],

        }
    } catch (e) {
        console.log(e);
        return null;
    }
};

module.exports = {varlidateGoogleIdToken};