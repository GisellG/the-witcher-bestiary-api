
const { Schema, model } = require('mongoose');

const CreatureSchema = Schema({
    creature_name: {
        type: String,
        required: [true, 'Creature name is mandatory'],
    },
    category: {
        type: String,
        required: [true, 'Category is mandatory'],
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
    }
});

module.exports = model( 'Creature', CreatureSchema );