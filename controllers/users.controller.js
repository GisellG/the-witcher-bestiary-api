const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getSingleUser = async (req, res = response) => {

    const { id } = req.params;

    //validate to DB
    const userById = await User.findById( id );
    let result;

    if(userById.state === true){
        result = userById
    } else{
        result = "User is deactivaded"
    }

    res.json({
        result,
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

    const { id } = req.params;
    const { nickname } = req.body;

    //validate to DB
    const userEdit = await User
        .findByIdAndUpdate(
            id, 
            { "nickname" : nickname }, 
            { new: true }
        );

    res.json({
        "result": {
            "user": userEdit
        }
    });

};

const deleteUsers = async (req, res = response) => {

    const { id } = req.params;
    const { state } = req.body;

        //validate to DB
        const userDelete = await User
        .findByIdAndUpdate(
            id, 
            { "state" : state }, 
            { new: true }
        );

    res.json({
        "msg": "User deactivated!",
        "result": {
            "user": userDelete
        },
    });

};

module.exports = {
    getSingleUser,
    postUser,
    putUser,
    deleteUsers
};