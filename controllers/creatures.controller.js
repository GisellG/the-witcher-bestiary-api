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