
const { response } = require("express");
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const user = require('../models/user');



const updateImageCloudinary = async (req, res = response) => {
    const { id } = req.params;
    let model;

    model = await user.findById(id);
    if (!model) {
        return res.status(400).json({
            msg: `To user with id ${id}`
        });
    }
    // Clear old images in server
    if (model.img) {
        const nameArr = model.img.split('/');
        const name = nameArr[nameArr.length - 1];
        const [ public_id ] = name.split('.');
        cloudinary.uploader.destroy(public_id);
        }
    

    const { tempFilePath } = req.files.image;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath).catch(console.log);


    model.img = secure_url;
     await model.save();
    
    res.json(model);
}


module.exports = {
    updateImageCloudinary
};
