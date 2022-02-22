const { response, request } = require('express');
const Creature = require('../models/creature');
const Group = require('../models/group');

const getAllRecords = async (req, res) => {

    const [ creatures, groups ] = await Promise.all([
        Creature.find(),
        Group.find()
    ]);

    res.json({
        creatures,
        groups
    });
};

module.exports = {
    getAllRecords
};