const { validationResult } = require('express-validator/check')
	, bcrypt = require('bcryptjs')
	, User = require('../models/User');

/**
 * Show registration form
 * 
 * @param req
 * @param res
 */
exports.showRegisterForm = (req, res) => {
	res.render('auth/register', {
		errors: []
	})
}

/**
 * Register a user after validation.
 * 
 * @param req
 * @param res
 */
exports.register = async (req, res) => {

	try {
		//validation errors
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			//validation failed
			return res.render('auth/register', {
				errors: errors.array(),
				name: req.body.name,
				email: req.body.email
			});
		}

		//create a new user object
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});

		// create a password hash
		bcrypt.genSalt(10, (err, hash) => {
			if (err) throw err;

			//set it to user object
			user.password = hash;

			//save the user to the database
			user.save()
				.then(user => {
					req.flash('success', 'You can now login!');
					res.redirect('/login');
				})
				.catch(err => console.log(err));
		})
	} catch (err) {
		console.log(err)
	}

}

/**
 * Show registration form
 * 
 * @param req
 * @param res
 */
exports.showLoginForm = (req, res) => {
	res.render('auth/login', {
		errors: []
	})
}

/**
 * Show registration form
 * 
 * @param req
 * @param res
 */
exports.login = (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.render('auth/login', {
			errors: errors.array(),
			email: req.body.email
		});
	}

	//login process..
}