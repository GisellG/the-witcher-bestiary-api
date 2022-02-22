const { Router } = require('express');
const { getAllRecords } = require('../controllers/all.controller');


const router = Router();

router.get('/', getAllRecords);

module.exports = router;

