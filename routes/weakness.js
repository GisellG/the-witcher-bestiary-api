const { Router } = require('express');
const { getWeaknessByName } = require('../controllers/weakness.controller');


const router = Router();

// router.get('/', getAllTypes);
router.get('/:typeName', getWeaknessByName);

module.exports = router;