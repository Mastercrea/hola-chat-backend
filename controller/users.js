const { response } = require("express");
const User = require ('../models/user');


const getUser = async (req, res = response) => {


    const quantity = Number(req.query.quantity) || 0;


    // the "-" change the order of the sort
    const users = await User.find({ _id: { $ne :req.uid } })
    .sort('-online')
    .skip(quantity)
    .limit(20);



console.log(users);
    res.json({
        ok: true,
        users: users
    });
}

module.exports = { 
    getUser
};