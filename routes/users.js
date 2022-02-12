const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, postUser, putUser, deleteUsers } = require('../controllers/users.controller');
const { validEmail } = require('../helpers/db-validator');
const { validateFields } = require('../middlewares/file-validator');


const router = Router();

//Provisional Endpoint
router.get('/:id', getUsers);
router.post('/', [
    check('nickname', 'Nickname is mandatory').not().isEmpty(),
    check('mail').isEmail(),
    check('mail').custom( validEmail ),
    check('password').isLength({ min: 6 }),
    validateFields
], postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUsers);

module.exports = router;