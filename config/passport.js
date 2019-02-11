const bcrypt = require('bcryptjs')
	, passport = require('passport')
	, localStrategy = require('passport-local').Strategy
	, User = require('../models/User');

exports.passportLocal = () => {
	passport.use(
		new localStrategy({usernameField: 'email'},( username, password, done) => {
			User.findOne({email: username}) //in our case username is email
				.then(user => {
					if(!user) {
						return done(null,false,{
							message: 'Invalid Email!'
						})
					}

					bcrypt.compare(password,user.password, ( err, isMatch) => {
						if(err) throw err;

						if(isMatch) {
							return done(null,user);
						} else {
							return done(null,false, {
								message: 'Invalid Password!'
							});
						}
					});
				})
				.catch(err => console.log(err));
		})
	);

	passport.serializeUser(( user, done) => {
		done(null,user.id);
	});

	passport.deserializeUser(( id, done) => {
		User.findById( id, ( err, user) => {
			done(err,user);
		})
	});
}