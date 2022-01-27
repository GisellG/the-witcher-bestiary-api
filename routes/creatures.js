
const { Router } = require('express');
const { getCreatures, postCreature, getSingleCreature } = require('../controllers/creatures.controller');

const router = Router();

router.get('/', getCreatures);
router.get('/:id', getSingleCreature);

// PROVISIONAL ENDPOINTS
router.post('/add', postCreature);

module.exports = router;
