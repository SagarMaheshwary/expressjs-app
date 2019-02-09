//module imports
const express = require('express')
	, router = express.Router();

//controllers
const HomeController = require('../controllers/HomeController');

//Routes
router.get('/',HomeController.index);

module.exports = router;