const { Schema, model } = require('mongoose');

const CreatureSchema = Schema({
    creature_name: {
        type: String,
        required: true,
        lowercase: true,
    },
    alt_name: {
        type: String,
        required: true,
        lowercase: true,
        required: false
    },
    group: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['beast', 'cursed', 'draconid', 'elementa', 'hybrid', 'insectoid', 'necrophage', 'ogroid', 'relict', 'specter', 'vampire']
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    oils: {
        type: String,
        required: true,
        lowercase: true,
    },
    weakness: {
        type: Array,
        required: true,
    },
    hunted: {
        type: Boolean,
        required: true,
    },
    location: {
        type: String,
        lowercase: true,
        required: false
    }
});

CreatureSchema.methods.toJSON = function() {
    const { __v, ...creature } = this.toObject();
    return creature;
};

module.exports = model( 'Creature', CreatureSchema );