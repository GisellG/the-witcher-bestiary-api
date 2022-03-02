const { response, request } = require('express');
const Creature = require('../models/creature');

const getCreatures = async (req, res = response) => {

    const { offset = 0, limit = 15 } = req.query;

    const [ count, creatures ] = await Promise.all([
        Creature.countDocuments(),
        Creature.find()
            .skip( Number(offset) )
            .limit( Number(limit) ),
    ]);

    res.json({
        offset,
        limit,
        count,
        creatures,
    });
};

const getCreatureById = async(req, res = response) => {

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

const getCreatureByName = async ( req, res = response) => {

    const { creatureName } = req.params;
    const findByName = await Creature.findOne( { creature_name: creatureName } );

    res.json({
        creatureName,
        "msg": "ok",
        findByName
    });

};

const putCreature = async (req, res = response) => {

    const { id } = req.params;
    const { hunted, location } = req.body;

    //validate to DB
    const creatureEdit = await Creature
        .findByIdAndUpdate(
            id,
            { "hunted" : hunted, "location": location },
            { new: true }
        );

    res.json({
        "msg": "Creature modified succesfuly",
        "results": {
            "creature": creatureEdit
        },
    });
};

const postCreature = async (req, res = response) => {

    const newCreature = req.body;
    const creature = new Creature( newCreature );

    // Validating duplicate name
    const { creature_name, alt_name } = creature;
    const existingCreatureByName = await Creature.findOne({ creature_name });
    const existingCreatureByAltName = await Creature.findOne({ alt_name });
    const namingValidation = existingCreatureByName || existingCreatureByAltName;

    if( namingValidation ){
        return res.status(400).json({
            status: "HTTP ERROR 400 - BAD REQUEST",
            msg: "Whoops, this creature is in the database already!"
        });
    };

    // Saving creature in DB
    await creature.save();

    res.status(201).json({
        status: "HTTP SUCCESS 201 - CREATED",
        msg: `Horay! Creature ${alt_name} created!`,
        creature
    });

};

const deleteCreature = async (req, res) => {

    const { id } = req.params;
    const creatureDelete = await Creature.findByIdAndDelete( id );

    res.json({
        "msg": "ok",
        "creature deleted": creatureDelete
    })
};

module.exports = {
    getCreatures,
    getCreatureById,
    putCreature,
    postCreature,
    deleteCreature,
    getCreatureByName
};