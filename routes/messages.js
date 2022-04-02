/*
* Path: /api/messages
*
* */

const {obtainChat} = require('../controller/messages');

const {Router} = require('express');
const {validateJWT} = require("../middlewares/validate-jwt");

const router = Router();

// Messages in BD
// URL, Conditional, Controller
router.get('/:from', validateJWT, obtainChat);

module.exports = router;