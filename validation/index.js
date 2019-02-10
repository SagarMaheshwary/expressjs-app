const { check } = require('express-validator/check');

/**
 * Validate article before storing it.
 */
exports.validateArticle = [
	check('title') // don't allow empty fields
		.not()
		.isEmpty()
		.withMessage('Article title is required!')
		.isLength({min: 5, max:50}) // specify a length
		.withMessage('Article title must be atleast 5 to 50 characters long!'),
	check('body') // don't allow empty fields
		.not()
		.isEmpty()
		.withMessage('Article body is required!')
		.isLength({min:10,max:5000}) // specify a length
		.withMessage('Article body must be atleast 10 to 5000 characters long!')
];