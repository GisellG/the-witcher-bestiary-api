const { response, request } = require('express');

const Creature = require('../models/creature');

/**
 * * getCreatures
 * Uses the params from the request to return a list of results from the database.
 * 
 * @param req uses query params like Offset and Limit to skip or limit the search.
 * @param res returns the results of the search.
 * 
 * @returns Object with 
 *  @param offset (num) and 
 *  @param limmit (num) determined at the request; 
 *  @param count (num) for the quantity of elements on the database;
 *  @param creatures (obj) obtains every creature found that matches the previous parameters.
 */
const getCreatures = async (req = request, res = response) => {

    const { 
        offset = 0,
        limit  = 15
    } = req.query;

    const [ count, creatures ] = await Promise.all([
        Creature.countDocuments(),
        Creature.find()
            .skip(  Number(offset) )
            .limit( Number(limit) ),
    ]);

    res.json({
        offset,
        limit,
        count,
        creatures,
    });
};

/**
 * * getCreatureById
 * Uses the id param from the request to return an specific result from the database.
 * @param req uses id query paramto specify the search.
 * @param res returns the results of the search.
 * 
 * @returns Object with
 *  @param id (string) from request params -the one the user is sending for search-;
 *  @param creatureById (obj) with the result of that specific id.
 */
const getCreatureById = async(req = request, res = response) => {

    const { id } = req.params;

    const creatureById = await Creature.findById( id );

    res.json({
        "search": {
            "id": id
        },
        "result": {
            "msg"     : `Creature with id #${id} founded!`,
            "creature": creatureById
        }
    });
};

/**
 * * getCreatureByName
 * Uses the name param from the request to return an specific result from the database. A clarification is needed, this search allows you to made a request with the alt_name or creature_name and uses any of those to returns a creature result.
 * 
 * @param req uses name query param to specify the search.
 * @param res returns the results of the search.
 * 
 * @returns Object with
 *  @param creatureName (string) from request params -the one the user is sending for search-;
 *  @param creatureFound (obj) with the result of that specific name.
 */
const getCreatureByName = async (req = request, res = response) => {

    const { creatureName } = req.params;
    const byName    = await Creature.findOne( { creature_name: creatureName } );
    const byAltName = await Creature.findOne( { alt_name     : creatureName } );

    let creatureFound;

    if(!byName){
        creatureFound = byAltName;
    } else {
        creatureFound = byName;
    }

    res.json({
        "search": {
            "name": creatureName
        },
        "result": {
            "msg"     : `Creature named ${creatureName} found!`,
            "creature": creatureFound
        },
    });

};

const putCreature = async (req, res = response) => {

    const { id } = req.params;
    const { hunted, location } = req.body;

    //validate to DB
    const creatureEdit = await Creature
        .findByIdAndUpdate(
            id,
            { "hunted"  : hunted, 
              "location": location },
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