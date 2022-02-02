const Group = require('../models/group');

const validGroup = async (name = '') => { 

    const groupExist = await Group.findOne({ name });

    if( !groupExist ){
        throw new Error(`The group category ${ name } is not in the DB`);
    };

};

module.exports = {
    validGroup
};