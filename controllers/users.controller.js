const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req, res = response) => {

    res.json({
        "msg": "ok GET method"
    });

};

const postUser = async (req, res = response) => {

    const {nickname, mail, password} = req.body;
    const user = new User({nickname, mail, password});

    // Encript password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    // Saving user in DB
    await user.save();

    res.json({
        user,
        "msg": nickname + " was created succesfuly"
    });

};

const putUser = async (req, res = response) => {

    res.json({
        "msg": "ok PUT method"
    });

};

const deleteUsers = async (req, res = response) => {

    res.json({
        "msg": "ok DELETE method"
    });

};

module.exports = {
    getUsers,
    postUser,
    putUser,
    deleteUsers
};