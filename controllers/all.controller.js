const { response, request } = require('express');

const Creature = require('../models/creature');
const Group    = require('../models/group');
const Weakness = require('../models/issue');
const Location = require('../models/location');

/**
 * * getAllRecords
 * Is a promise that brings all the results from Creatures, Group and Weakness models.
 * 
 * @param res returns the response of the .find() method.
 * 
 * @returns Object with the results of the models.
 */
const getAllRecords = async (req = request, res = response) => {

    const [ creatures, groups, weakness, locations ] = await Promise.all([
        Creature.find(),
        Group.find(),
        Weakness.find(),
        Location.find()
    ]);

    res.json({
        'creatures': creatures,
        'types'    : groups,
        'weakness' : weakness,
        'locations': locations
    });

};

module.exports = {
    getAllRecords
};