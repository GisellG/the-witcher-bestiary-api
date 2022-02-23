const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles, updateFile, renderImage, updateFileCloudinary } = require('../controllers/uploads.controller');
const { validCollection } = require('../helpers/db-validator');

const { validateFields, validateFile } = require('../middlewares/file-validator');

const router = Router();

router.get('/:collection/:id', [
    check('id', 'The id is not in the collection').isMongoId(),
    check('collection', 'The collection do not exist').custom( i => validCollection( i, ['creatures', 'users', 'issues'])),
    validateFields,
], renderImage);

router.post( '/', uploadFiles );

router.put('/:collection/:id', [
    validateFile,
    check('id', 'The id is not in the collection').isMongoId(),
    check('collection', 'The collection do not exist').custom( i => validCollection( i, ['creatures', 'users', 'issues'])),
    validateFields,
], updateFileCloudinary);

module.exports = router;