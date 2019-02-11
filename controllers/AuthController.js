const { validationResult } = require('express-validator/check')
	, bcrypt = require('bcryptjs')
	, User = require('../models/User')
	, passport = require('passport');

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
		bcrypt.genSalt(10, ( err, salt) => {
			bcrypt.hash( user.password,salt, ( err, hash) => {
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
 * @param next
 */
exports.login = ( req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.render('auth/login', {
			errors: errors.array(),
			email: req.body.email
		});
	}

	// Authenticate with local strategy.
	passport.authenticate('local', ( err, user, info) => {
		
		//custom login flow
		if (err) return next(err);
		
		if (!user) { // invalid credentials
			return res.render('auth/login',{
				email: req.body.email,
				errors: [],
				error: 'Invalid Email and Password'
			});
		}
		
		req.logIn(user, (err) => {
			if (err) return next(err); //login failed
			
			//login success
			req.flash('success','You are Logged in!');
			return res.redirect('/dashboard');	
		});
	})( req, res, next);

}

/**
 * Log the user out.
 * 
 * @param req
 * @param res
 */
exports.logout = ( req, res) => {
	req.logout(); // logout
	req.flash('success','Logout Successful!');
	res.redirect('/login');
}