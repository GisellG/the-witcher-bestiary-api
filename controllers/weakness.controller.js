const { response, request } = require('express');
const Weakness = require('../models/issue');

const getWeaknessByName = async (req, res = response) => {
    const { typeName } = req.params;
    const findByName = await Weakness.findOne( { name: typeName } );

    res.json({
        typeName,
        "msg": "ok",
        findByName
    })
};

module.exports = {
    getWeaknessByName
}