
// {
//     id: "",
//     name: "",
//     category: "",
//     img: "",
//     shortDescription: "",
//     longDescription: "",
//     weakness: ""
// }

const { Schema, model } = require('mongoose');

const CreatureSchema = Schema({
    creature_name: {
        type: String,
        required: [true, 'Name is mandatory'],
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Category is mandatory']
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