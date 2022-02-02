const { Router } = require('express');
const { check } = require('express-validator');

const { getCreatures,
        postCreature,
        putCreature,
        getSingleCreature } = require('../controllers/creatures.controller');
const { validateFields } = require('../middlewares/file-validator');
const { validGroup } = require('../helpers/db-validator');

const router = Router();

router.get('/', getCreatures);
router.get('/:id', getSingleCreature);

// PROVISIONAL ENDPOINTS
router.post('/add', [
    check('creature_name', 'Creatures name is Mandatory').not().isEmpty(),
    check('group', 'Group is Mandatory').custom( validGroup ),
    check('shortDescription', 'A description is Mandatory').not().isEmpty(),
    check('longDescription', 'A description is Mandatory').not().isEmpty(),
    validateFields
], postCreature);

router.put('/:id', putCreature);

module.exports = router;
