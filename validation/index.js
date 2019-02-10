const { check } = require('express-validator/check');

/**
 * Validate article before storing it.
 */
exports.validateArticle = [
	check('title') // don't allow empty fields
		.not()
		.isEmpty()
		.withMessage('Article title is required!')
		.isLength({ min: 5, max: 50 }) // specify a length
		.withMessage('Article title must be atleast 5 to 50 characters long!'),

	check('body') // don't allow empty fields
		.not()
		.isEmpty()
		.withMessage('Article body is required!')
		.isLength({ min: 10, max: 5000 }) // specify a length
		.withMessage('Article body must be atleast 10 to 5000 characters long!')
];


exports.validateRegisterForm = [
	check('name')
		.not()
		.isEmpty()
		.withMessage('Name is required!')
		.isLength({ min: 3, max: 50 })
		.withMessage('Name must be atleast 5 to 50 characters long!'),

	check('email')
		.not()
		.isEmpty()
		.withMessage('Email is required!')
		.isEmail()
		.withMessage('Invalid Email')
		.isLength({ min: 5, max: 100 })
		.withMessage('Email must be atleast 5 to 100 characters long!')
		.custom(async (value, { req }) => {
			const user = await User.findOne({ email: req.body.email })
			if (user) {
				throw new Error('Email is taken!')
			}
		}),

	check("password")
		.not()
		.isEmpty()
		.withMessage('Password is required!')
		.isLength({ min: 5, max: 100 })
		.withMessage('Password must be atleast 5 to 100 characters long!')
		.custom((value, { req, loc, path }) => {
			if (value !== req.body.confirm_password) {
				// throw error if passwords do not match
				throw new Error("Passwords don't match");
			} else {
				return value;
			}
		}),

	check('confirm_password')
		.not()
		.isEmpty()
		.withMessage('Please re-enter your password!')
];

exports.validateLoginForm = [
	check('email')
		.not()
		.isEmpty()
		.withMessage('Email is required!')
		.isEmail()
		.withMessage('Invalid Email')
		.isLength({ min: 5, max: 100 }).withMessage('Email must be atleast 5 to 100 characters long!'),

	check("password")
		.not()
		.isEmpty()
		.withMessage('Password is required!')
		.isLength({ min: 5, max: 100 })
		.withMessage('Password must be atleast 5 to 100 characters long!')
];