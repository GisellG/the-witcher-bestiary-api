const { response, request } = require('express');
const Creature = require('../models/creature');
const Group = require('../models/group');

const getCreatures = async (req, res = response) => {

    const { offset = 0, limit = 15 } = req.query;
    const creatures = await Creature.find();
    const groups = await Group.find();

    res.json({
        "count": 123,
        offset,
        limit,
        "results": [creatures, groups]
    });
};

const getSingleCreature = (req, res = response) => {

    const id = req.params.id;

    res.json({
        "results": {
            "id": id,
            "creature": "creature found"
        },
    });
};

const postCreature = async (req, res = response) => {

    const { creature_name, group, shortDescription, longDescription } = req.body;
    const creature = new Creature( { creature_name, group, shortDescription, longDescription } );

    // Validating duplicate name
    const existingCreature = await Creature.findOne({ creature_name });
    if( existingCreature ){
        return res.status(400).json({
            msg: "This creature already exist!"
        });
    };

    // Saving creature in DB
    await creature.save();

    res.status(201).json({
        "ok": true,
        "msg": "PROVISIONAL ENDPOINT! creature created!",
        "new_creature": creature
    });

    console.log("A new creature was added");
};

module.exports = {
    getCreatures,
    getSingleCreature,
    postCreature,
};