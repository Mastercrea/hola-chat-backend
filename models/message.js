const {Schema, model} = require('mongoose');

const MessageSchema = Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    for: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true
    }
});
MessageSchema.set('timestamps', true);
MessageSchema.method('toJSON', function () {
    // not show the data in the object "__v, _id, password" and create a new object "... object"
    const {__v, _id, ... object } = this.toObject();
    return object;
});


module.exports = model('Message', MessageSchema);