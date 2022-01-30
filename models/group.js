
const {Schema, model} = require('mongoose');

const GroupSchema = Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    list: {
        type: String,
        require: false
    }
});

module.exports = model( 'Group', GroupSchema );