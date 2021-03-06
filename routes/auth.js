/*
    path: api/login

*/

const {Router} = require('express');
const {check} = require("express-validator");
const {createUser, login, renewToken, googleAuth} = require("../controller/auth");
const {validateData} = require("../middlewares/validate-data");
const {validateJWT} = require("../middlewares/validate-jwt");


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
// Google sign in
router.post('/google', googleAuth);

module.exports = router;