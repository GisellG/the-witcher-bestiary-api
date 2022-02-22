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
const { validGroup, validId } = require('../helpers/db-validator');

const router = Router();

router.get('/', getCreatures);

router.get('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check( 'id', 'Id not found' ).custom( validId ),
    validateFields
], getCreatureById);

router.put('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check( 'id', 'Id not found' ).custom( validId ),
    validateFields
], putCreature);

// PROVISIONAL ENDPOINTS
router.get('/search/:creatureName', getCreatureByName);

router.post('/add', [
    check('creature_name', 'Creatures name is Mandatory').not().isEmpty(),
    check('group', 'Group is Mandatory').custom( validGroup ),
    check('img', 'Image is Mandatory').not().isEmpty(),
    check('shortDescription', 'A description is Mandatory').not().isEmpty(),
    check('longDescription', 'A description is Mandatory').not().isEmpty(),
    validateFields
], postCreature);

router.delete('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check( 'id', 'Id not found' ).custom( validId ),
    validateFields
], deleteCreature);


module.exports = router;
