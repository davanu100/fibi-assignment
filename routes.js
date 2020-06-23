const express = require('express');
const router = express.Router();

const controller = require('./controllers');

//GET Request
router.get('/',controller.getImages)

//POST Request
router.post('/',controller.postImage)

module.exports = router;