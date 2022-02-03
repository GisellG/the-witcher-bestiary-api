const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers } = require('../controllers/users.controller');

const router = Router();

router.get('/', getUsers);

module.exports = router;