const { Router } = require('express');
const { check } = require('express-validator');

const { getCreatures,
        postCreature,
        putCreature,
        getCreatureById,
        deleteCreature,
        getCreatureByName
} = require('../controllers/creatures.controller');
const { validateFields } = require('../middlewares/file-validator');
const { validGroup, validId, validImputName } = require('../helpers/db-validator');


const router = Router();

router.get('/', getCreatures);

router.get('/search/by-id/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check('id', 'Is not found on the database' ).custom( validId ),
    validateFields
], getCreatureById);

router.get('/search/by-name/:creatureName', [
    check('creatureName', 'Is not a valid name').isString(),
    check('creatureName', 'Is not found in this database' ).custom( validImputName ),
    validateFields
], getCreatureByName);

router.put('/edit/:id', [
    check('id',     'Is not a valid ID').isMongoId(),
    check('id',     'Is not found' ).custom( validId ),
    check('hunted', 'Is empty').not().isEmpty(),
    check('hunted', 'Is not a boolean').isBoolean(),
    validateFields
], putCreature);

// PROVISIONAL ENDPOINTS
router.post('/add', [
    check('creature_name', 'Creatures name is Mandatory').not().isEmpty(),
    check('group', 'Group is Mandatory').custom( validGroup ),
    check('img', 'Image is Mandatory').not().isEmpty(),
    check('description', 'A description is Mandatory').not().isEmpty(),
    validateFields
], postCreature);

router.delete('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check( 'id', 'Id not found' ).custom( validId ),
    validateFields
], deleteCreature);


module.exports = router;
