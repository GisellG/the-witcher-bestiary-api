
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    nickname: {
        type: String,
        required: [true, 'Name is mandatory']
    },
    mail: {
        type: String,
        required: [true, 'Mail is mandatoy'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory'],
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user  } = this.toObject();
    return user;
};

module.exports = model( 'User', UserSchema );
