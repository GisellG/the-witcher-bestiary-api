const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response, request } = require('express');
const { uploadImages } = require('../helpers/upload-file');
const Creature = require('../models/creature');
const Issue = require('../models/issue');

const uploadFiles = async(req, res = response) => {

    try {
        const fileName = await uploadImages( req.files, undefined, 'images' );
        res.json({
            name: fileName
        });
    } catch (msg) {
        res.status(400).json({ msg })
    }

};

const renderImage = async (req, res = response) => {

    const { id, collection } = req.params;

    switch (collection) {

        case 'creatures':
            model = await Creature.findById(id);
            if(!model){
                return res.status(404).json({
                    msg: `There's no creature with the id ${id}`
                });
            }
        break;

        default:
            return res.status(500).json({
                msg: 'Error trying to validate this collection'
            });
    };

    // clean previous images
    if (model.img){
        // verifi if exist, although erase & replace
        const pathImage = path.join( __dirname, '../uploads', collection, model.img );
        if( fs.existsSync(pathImage)){
            return res.sendFile( pathImage )
        }
    };

    const pathImage = path.join( __dirname, '../assets/no-image.png');
    res.sendFile(pathImage);
};

const updateFileCloudinary = async(req, res = response) => {

    const {collection, id} = req.params;

    let model;

    switch (collection) {

        case 'creatures':
            model = await Creature.findById(id);
            if(!model){
                return res.status(404).json({
                    msg: `There's no creature with the id ${id}`
                });
            }
        break;

        case 'issues':
            model = await Issue.findById(id);
            if(!model){
                return res.status(404).json({
                    msg: `There's no creature with the id ${id}`
                });
            }
        break;

        default:
            return res.status(500).json({
                msg: 'Error trying to validate this collection'
            });
    }

    // clean previous images
    if (model.img){
        // verify if exist, although erase & replace
        const nameArray = model.img.split('/');
        const name = nameArray[ nameArray.length - 1 ];
        const [ public_id ] = name.split('.');

        cloudinary.uploader.destroy( public_id );
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    model.img = secure_url;

    await model.save();

    res.json ( model );
};

module.exports = {
    uploadFiles,
    renderImage,
    updateFileCloudinary
};