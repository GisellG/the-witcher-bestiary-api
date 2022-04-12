const Creature = require('../models/creature');
const Group    = require('../models/group');
const Location = require('../models/location');

const validGroup      = async (name = '') => { 

    const groupExist = await Group.findOne({ name });

    if( !groupExist ){
        throw new Error(`The group category ${ name } is not in the DB`);
    };

};

const validId         = async (id) => {

    const idExist = await Creature.findById(id);

    if( !idExist ){
        throw new Error(`The id ${id} is not in this db`);
    }

};

const validName       = async (name) => {

    const nameExist    = await Creature.findOne({ creature_name: name});
    const altNameExist = await Creature.findOne({ alt_name     : name});

    if( !nameExist && !altNameExist){
        throw new Error(`The creature named ${name} is not in this db`);
    }

};

const validCollection = (collection = '', collections = '') => {

    const collectionExist = collections.includes(collection);

    if(!collectionExist){
        throw new Error(`The collection ${collection} in not in the DB. Try with ${collections}`)
    }

    return true;

}

const validLocation   = async (location) => {

    const locationExist = await Location.findOne({ name: location });

    if(!locationExist){
        throw new Error(`The location ${location} is not in this DB`);
    }

};

module.exports = {
    validGroup,
    validId,
    validName,
    validCollection,
    validLocation
};