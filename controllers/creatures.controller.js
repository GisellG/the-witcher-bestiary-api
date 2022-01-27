const { response } = require('express');

const getCreatures = (req, res = response) => {

    const { offset = 0, limit = 15 } = req.query;

    res.json({
        "count": 123,
        offset,
        limit,
        "results": [
            {
                "creature": "creature found"
            },
            {
                "creature": "creature found"
            }
        ]
    });
};

const getSingleCreature = (req, res = response) => {

    const id = req.params.id;

    res.json({
        "results": {
            "id": id,
            "creature": "creature found"
        },
    });
};

const postCreature = (req, res = response) => {

    const body = req.body;

    res.status(201).json({
        "ok": true,
        "msg": "PROVISIONAL ENDPOINT! creature created!",
        "new_creature": body
    });

    console.log("A new creature was added");
};

module.exports = {
    getCreatures,
    getSingleCreature,
    postCreature,
};