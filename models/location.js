const {Schema, model} = require('mongoose');

const LocationSchema = Schema({
    name: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: false
    },
    emblem: {
        type: String,
        required: false
    }
});

LocationSchema.methods.toJSON = function() {
    const {__v, ...location} = this.toObject();
    return location;
};

module.exports = model( 'Location', LocationSchema );