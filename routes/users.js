/*
    path: api/users

*/
const {Router} = require('express');
const { getUser } = require('../controller/users');
const {validateJWT} = require("../middlewares/validate-jwt");

const router = Router();

// users in BD
router.get('/', validateJWT, getUser);

module.exports = router;