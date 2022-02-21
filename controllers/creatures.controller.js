const { response, request } = require('express');
const Creature = require('../models/creature');
const Group = require('../models/group');

const getCreatures = async (req, res = response) => {

    const { offset = 0, limit = 15 } = req.query;

    const [ count, creatures, groups ] = await Promise.all([
        Creature.countDocuments(),
        Creature.find()
            .skip( Number(offset) )
            .limit( Number(limit) ),
        Group.find()
    ])

    res.json({
        offset,
        limit,
        count,
        creatures,
        groups
    });
};

const getSingleCreature = async(req, res = response) => {

    const { id } = req.params;

    //validate to DB
    const creatureById = await Creature.findById( id );

    res.json({
        "results": {
            "id": id,
            "creature": creatureById
        },
    });
};

const putCreature = async (req, res = response) => {

    const { id } = req.params;
    const { haunted } = req.body;

    //validate to DB
    const creatureEdit = await Creature
        .findByIdAndUpdate(
            id,
            { "haunted" : haunted },
            { new: true }
        );

    res.json({
        "results": {
            "haunted?": haunted,
            "creature": creatureEdit
        },
    });
};

const postCreature = async (req, res = response) => {

    const { creature_name, group, shortDescription, longDescription, haunted, img } = req.body;
    const creature = new Creature( { creature_name, group, shortDescription, longDescription, haunted, img } );

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
        "msg": "Creature created!",
        creature
    });

};

module.exports = {
    getCreatures,
    getSingleCreature,
    putCreature,
    postCreature,
};