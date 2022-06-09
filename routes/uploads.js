/*
    path: api/uploads

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { updateImageCloudinary } = require('../controller/uploads');
const { validateFileUpload } = require('../middlewares/valdate-file');
const { validateData } = require('../middlewares/validate-data');
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

// add or update images in cloudinary
router.put('/:id', [
    validateFileUpload,
    check('id', 'id must be mongoID').isMongoId(),
    validateData
], updateImageCloudinary);

module.exports = router;