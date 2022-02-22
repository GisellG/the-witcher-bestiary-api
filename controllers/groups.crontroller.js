const { response, request } = require('express');
const Group = require('../models/group');

const getTypeByName = async(req, res = response) => {

    const { typeName } = req.params;
    const findByName = await Group.findOne( { name: typeName } );

    res.json({
        typeName,
        "msg": "ok",
        findByName
    })
};

const getAllTypes = async(req, res = response) => {

    const [ count, types ] = await Promise.all([
        Group.countDocuments(),
        Group.find()
    ]);

    res.json({
        "msg": "ok",
        count,
        types
    })
}

module.exports = {
    getAllTypes,
    getTypeByName
};