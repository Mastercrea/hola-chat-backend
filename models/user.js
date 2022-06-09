const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String
    },
    google: {
        type: Boolean,
        default: false
    },
    online: {
        type: Boolean,
        default: false
    }
});

UserSchema.method('toJSON', function () {
    // not show the data in the object "__v, _id, password" and create a new object "... object"
    const {__v, _id, password, ... object } = this.toObject();
    object.uid = _id;
    return object;
});


module.exports = model('User', UserSchema);