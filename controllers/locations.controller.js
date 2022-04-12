const { response, request } = require('express');

const Location = require('../models/location');

const getLocation  = async (req = request, res = response) => {

    const [ count, locations ] = await Promise.all([
        Location.count(),
        Location.find()
    ]);

    res.json({
        count,
        locations
    });

};

const postLocation = async (req = request, res = response) => {

    const newLocation = req.body;
    const location = new Location( newLocation );

    // Validating duplicate name
    const { name } = location;
    const existingLocationByName = await Location.findOne({ name });

    if( existingLocationByName ){
        return res.status(400).json({
            status: "HTTP ERROR 400 - BAD REQUEST",
            msg   : "Whoops, this location is in the database already!"
        });
    };

    // Saving creature in DB
    await location.save();

    res.status(201).json({
        "msg"    : `The location ${newLocation} was created succesfully`,
        "results": {
            location
        },
    });
};

const putLocation  = async (req = request, res = response) => {

    const { locationName }        = req.params;
    const { emblem, description } = req.body;

    const locationEdit = await Location.findOneAndUpdate(
        { name         : locationName},
        { "emblem"     : emblem, 
          "description": description },
        { new          : true }
    );

    res.json({
        "msg"    : "Location modified successfully",
        "results": {
            "location": locationEdit
        }
    });

};

module.exports = {
    getLocation,
    postLocation,
    putLocation
};