const express = require('express')
	, router = express.Router();

/**
 * Controllers
 */
const HomeController = require('../controllers/HomeController')
	, ArticlesController = require('../controllers/ArticlesController')
	, AuthController = require('../controllers/AuthController');

/**
 * Validation methods.
 */
const Validator = require('../validation/index');

/**
 * All Routes.
 */

//Show home page.
router.get(
	'/',
	HomeController.index
);

//Display all articles.
router.get(
	'/articles',
	ArticlesController.index
);

//Create article form.
router.get(
	'/articles/create',
	ArticlesController.create
);

//Store article.
router.post(
	'/articles',
	Validator.validateArticle,
	ArticlesController.store
);

//Show a specified article.
router.get(
	'/articles/:id',
	ArticlesController.show
);

//Edit article form.
router.get(
	'/articles/:id/edit',
	ArticlesController.edit
);

//Update specified article.
router.put(
	'/articles/:id',
	Validator.validateArticle,
	ArticlesController.update
);

//Delete specified article.
router.delete(
	'/articles/:id',
	ArticlesController.destroy
);

//show register form
router.get(
	'/register',
	AuthController.showRegisterForm
);

//register the user
router.post(
	'/register',
	Validator.validateRegisterForm,
	AuthController.register
);

router.get(
	'/login',
	AuthController.showLoginForm
);

router.post(
	'/login',
	Validator.validateLoginForm,
	AuthController.login
);

module.exports = router;