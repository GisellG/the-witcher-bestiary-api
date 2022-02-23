
const {Schema, model} = require('mongoose');

const GroupSchema = Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

module.exports = model( 'Group', GroupSchema );