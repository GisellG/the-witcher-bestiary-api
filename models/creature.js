
const { Schema, model } = require('mongoose');

const CreatureSchema = Schema({
    creature_name: {
        type: String,
        required: [true, 'Creature name is mandatory'],
    },
    group: {
        type: String,
        required: [true, 'Group is mandatory'],
        lowercase: true,
        enum: ['beast', 'cursed', 'draconid', 'elementa', 'hybrid', 'insectoid', 'necrophage', 'ogroid', 'relict', 'specter', 'vampire']
    },
    img: {
        type: String,
        required: false
    },
    shortDescription: {
        type: String,
        required: [true, 'A description is mandatory']
    },
    longDescription: {
        type: String,
        required: [true, 'A description is mandatory']
    },
    weakness: {
        type: String,
        required: false
    },
    haunted: {
        type: Boolean,
        required: true
    }
});

CreatureSchema.methods.toJSON = function() {
    const { __v, ...creature } = this.toObject();
    return creature;
};

module.exports = model( 'Creature', CreatureSchema );