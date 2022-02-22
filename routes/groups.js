const { Router } = require('express');
const { getTypeByName, getAllTypes } = require('../controllers/groups.crontroller');


const router = Router();

router.get('/', getAllTypes);
router.get('/:typeName', getTypeByName);

module.exports = router;

