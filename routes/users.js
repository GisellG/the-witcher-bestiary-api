const { Router } = require('express');
const { check } = require('express-validator');

const { getSingleUser, postUser, putUser, deleteUsers } = require('../controllers/users.controller');
const { validEmail, validUser } = require('../helpers/db-validator');
const { validateFields } = require('../middlewares/file-validator');


const router = Router();

//Provisional Endpoint
router.get('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check( 'id', 'Id not found' ).custom( validUser ),
    validateFields
], getSingleUser);
router.post('/', [
    check('nickname', 'Nickname is mandatory').not().isEmpty(),
    check('mail').isEmail(),
    check('mail').custom( validEmail ),
    check('password').isLength({ min: 6 }),
    validateFields
], postUser);
router.put('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check( 'id', 'Id not found' ).custom( validUser ),
    validateFields
], putUser);
router.delete('/:id', [
    check('id', 'Is not a valid ID').isMongoId(),
    check( 'id', 'Id not found' ).custom( validUser ),
    validateFields
], deleteUsers);

module.exports = router;