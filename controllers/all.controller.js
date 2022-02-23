const { response, request } = require('express');
const Creature = require('../models/creature');
const Group = require('../models/group');
const Weakness = require('../models/issue');

const getAllRecords = async (req, res) => {

    const [ creatures, groups, weakness ] = await Promise.all([
        Creature.find(),
        Group.find(),
        Weakness.find()
    ]);

    res.json({
        creatures,
        'types': groups,
        weakness
    });

};

module.exports = {
    getAllRecords
};