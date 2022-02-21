const Creature = require('../models/creature');
const Group = require('../models/group');
const User = require('../models/user');

const validGroup = async (name = '') => { 

    const groupExist = await Group.findOne({ name });

    if( !groupExist ){
        throw new Error(`The group category ${ name } is not in the DB`);
    };

};

const validEmail = async (mail = '') => {

    const isValidEmail = await User.findOne( { mail } );

    if( isValidEmail ){
        throw new Error(`The email ${mail} is already on the DB`)
    }

};

const validId = async (id) => {

    const idExist = await Creature.findById(id);

    if( !idExist ){
        throw new Error(`The id ${id} is not in this db`);
    }

};

const validUser = async (id) => {

    const idExist = await User.findById(id);

    if( !idExist ){
        throw new Error(`The id ${id} is not in this db`);
    }

};

const validCollection = (collection = '', collections = '') => {
    const collectionExist = collections.includes(collection);
    if(!collectionExist){
        throw new Error(`The collection ${collection} in not in the DB. Try with ${collections}`)
    }

    return true;
}

module.exports = {
    validGroup,
    validId,
    validUser,
    validEmail,
    validCollection
};