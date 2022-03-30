const jwt = require('jsonwebtoken');


const validateJWT = (req, res, next) => {
    // read token
    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            ok: false,
            msg: 'Not token in the request'
        })
    }
    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;


        next();
    } catch (err){
        return res.status(401).json({
            ok: false,
            msg: 'Token not valid'
        })
    }



}

module.exports = {
    validateJWT
}