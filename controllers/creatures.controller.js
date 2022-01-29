const { response, request } = require('express');
const Creature = require('../models/creature');

const getCreatures = (req, res = response) => {

    const { offset = 0, limit = 15 } = req.query;

    res.json({
        "count": 123,
        offset,
        limit,
        "results": [
            {
                "creature": "creature found"
            },
            {
                "creature": "creature found"
            }
        ]
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

    const { creature_name, category, shortDescription, longDescription } = req.body;
    const creature = new Creature( { creature_name, category, shortDescription, longDescription } );

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