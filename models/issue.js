
const {Schema, model} = require('mongoose');

const IssueSchema = Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: false
    },
    kind_of_weakness: {
        type: String,
        require: true
    }
});

module.exports = model( 'Issue', IssueSchema );