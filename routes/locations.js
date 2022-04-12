const { Router } = require('express');
const { check }  = require('express-validator');

const { getLocation,
        postLocation,
        putLocation }    = require('../controllers/locations.controller');
const { validLocation }  = require('../helpers/db-validator');
const { validateFields } = require('../middlewares/file-validator');


const router = Router();

router.get('/', getLocation);

router.post('/add', [
    check('name', 'Is Mandatory').not().isEmpty(),
    validateFields
], postLocation);

router.put('/edit/:locationName',[
    check('locationName', 'Is a string').isString(),
    check('locationName', 'Is not found on the database').custom(validLocation),
    validateFields
], putLocation);

module.exports = router;
