const { response, request } = require('express');

const getUsers = async (req, res = response) => {

    res.json({
        "msg": "ok"
    });
    
};

module.exports = {
    getUsers
};