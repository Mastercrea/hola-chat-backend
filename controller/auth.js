const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require("../helpers/jwt");

const createUser = async (req, res = response) =>{
    // extract specific data from body
    const { email, password } = req.body;

    try {
        const existsEmail = await User.findOne({ email });
        if (existsEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'The email exists in bd'
            });
        }


        const user = new User(req.body);
        // bcrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
         const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user, token
        });

    } catch (err){
        console.error(err);
        res.status(500).json({
            ok: false,
            msg: 'Talk with the Administrator'
        })
    }
};

const login = async (req, res = response) => {
    // extract specific data from body
    const { email, password } = req.body;
    try{
        const userDB = await User.findOne({ email });
        if(!userDB) {

            return res.status(404).json({
                ok:false,
                msg: 'email not found'
            })

        }
        // validate password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'password not valid'
            })
        }

        // Generate JWT
        const token = await generateJWT(userDB.id);
        res.json({
            ok: true,
            user: userDB, token
        });



    }
    catch (err) {
        return res.status(500).json({
            ok: false,
            msg: 'talk with the administrator'
        });
        console.log(err);
    }

}
const renewToken = async ( req, res = response) => {

const uid = req.uid;
const token = await generateJWT(uid);
const user = await User.findById(uid);


    res.json({
        ok:true,
        user,
        token
    });

}

module.exports = {
    createUser,
    login,
    renewToken
};