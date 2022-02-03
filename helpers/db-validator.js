const Creature = require('../models/creature');
const Group = require('../models/group');

const validGroup = async (name = '') => { 

    const groupExist = await Group.findOne({ name });

    if( !groupExist ){
        throw new Error(`The group category ${ name } is not in the DB`);
    };

};
const validId = async (id) => {
    const idExist = await Creature.findById(id);
    if( !idExist ){
        throw new Error(`The id ${id} is not in this db`);
    }
};

module.exports = {
    validGroup,
    validId
};