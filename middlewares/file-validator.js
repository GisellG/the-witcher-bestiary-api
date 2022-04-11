const { validationResult } = require('express-validator');

const validateFields = ( req, res, next ) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400)
            .json({
                "msg": "There some errors at the request, please read the follow:", 
                "errors": errors.errors
            });
    };

    next();

};

const validateFile = ( req, res, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            "msg": 'No files were uploaded. - validateField'
        });
    };

    next();
};

module.exports = {
    validateFields,
    validateFile
}