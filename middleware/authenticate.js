
/**
 * Middleware to check if authenticated.
 */
exports.isAuthenticated = ( req, res, next) => {
	if(req.isAuthenticated()) {
		return next();
	}
	// redirect if unauthenticated
	res.redirect('/login');
}

/**
 * Middleware to check if unauthenticated.
 */
exports.notAuthenticated = ( req, res, next) => {
	if(!req.isAuthenticated()) {
		return next();
	}
	
	// redirect if authenticated
	res.redirect('/dashboard');
}