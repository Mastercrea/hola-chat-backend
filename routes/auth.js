const {Router} = require('express');
const {check} = require("express-validator");
const {createUser, login, renewToken} = require("../controller/auth");
const {validateData} = require("../middlewares/validate-data");
const {validateJWT} = require("../middlewares/validate-jwt");


/*
    path: api/login

*/


const router = Router();

router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateData
], createUser);

router.post('/',[
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateData
],login);
// validateJWT
router.get('/renew', validateJWT, renewToken);

module.exports = router;