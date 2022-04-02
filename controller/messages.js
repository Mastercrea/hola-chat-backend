const Message = require('../models/message');


const obtainChat = async (req, res) => {

    const myId = req.uid;
    const messageFrom = req.params.from;
    const last30 = await Message.find({
        $or:[{from: myId, for: messageFrom},
            {from: messageFrom, for: myId}]
    }).sort({createdAt: 'desc'}).limit(30);

    res.json({
        ok: true,
        myId: myId,
        messageFrom: messageFrom,
        messages: last30
    });

};

module.exports = {
    obtainChat
};