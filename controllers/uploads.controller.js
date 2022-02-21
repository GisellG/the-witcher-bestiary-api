
const { response, request } = require('express');
const { uploadImages } = require('../helpers/upload-file');
const Creature = require('../models/creature');
const User = require('../models/user');



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

const updateFile = async(req, res = response) => {

    const {collection, id} = req.params;

    let model;

    switch (collection) {

        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(404).json({
                    msg: `There's no user with the id ${id}`
                });
            }
        break;

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
    }
    const fileName = await uploadImages( req.files, undefined, collection );
    model.img = fileName;

    await model.save();

    res.json({
        "msg": "Image updated succesfully",
        model
    });

}


module.exports = {
    uploadFiles,
    updateFile
};