
const { Router } = require('express');
const { check } = require('express-validator');
const { getCreatures, postCreature, getSingleCreature } = require('../controllers/creatures.controller');

const router = Router();

router.get('/', getCreatures);
router.get('/:id', getSingleCreature);

// PROVISIONAL ENDPOINTS
router.post('/add', [
    check('creature_name', 'Name is Mandatory').not().isEmpty(),
    check('category', 'Category is Mandatory').not().isEmpty(),
    check('shortDescription', 'A description is Mandatory').not().isEmpty(),
    check('longDescription', 'A description is Mandatory').not().isEmpty(),
], postCreature);

module.exports = router;
