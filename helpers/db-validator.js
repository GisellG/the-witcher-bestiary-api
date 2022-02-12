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

module.exports = {
    validGroup,
    validId,
    validEmail
};