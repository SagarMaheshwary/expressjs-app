const Article = require('../models/Article')
	, { validationResult } = require('express-validator/check')
	, moment = require('moment');

/**
 * Retrieve all articles from the database and
 * show it in the index view with basic pagination.
 * 
 * @param req
 * @param res
 */
exports.index = async (req, res) => {
	try {
		const limit = 6; // no of articles diplayed in each page

		// no of articles to skip e.g if we are on page 2 then 6 and 12 on page 3.
		const skip = req.query.page > 1 ? (req.query.page * limit) - limit : 0;

		// all articles and total count of articles for pagination.
		const [results, itemCount] = await Promise.all([
			Article
				.find({})
				.sort({ created_at: -1 })
				.limit(limit)
				.skip(parseInt(skip))
				.lean()
				.exec(),
			Article.countDocuments({})
		]);

		//total pages for pagination
		const pageCount = Math.ceil(itemCount / limit);

		res.render('articles/index', {
			articles: results,
			pageCount,
			currentPage: req.query.page || 1,
			moment //momentjs for displaying date in a human readable format
		});
	} catch (err) {
		console.log(err)
	}
}

/**
 * Display a form to create an article.
 * 
 * @param req
 * @param res
 */
exports.create = (req, res) => {
	// validation errors array, defined here so we don't
	// have to check for 'undefined' inside the views repeatedly.
	res.render('articles/create', {
		errors: []
	});
}

/**
 * store the article to the database after validation.
 * 
 * @param req
 * @param res
 */
exports.store = async (req, res) => {
	try {
		//if validation fails then get all the errors.
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			//return back to the view with validation errors
			// and form data.
			return res.render('articles/create', {
				errors: errors.array(),
				title: req.body.title,
				body: req.body.body
			});
		}

		//create a new Article object
		const article = new Article({
			title: req.body.title,
			body: req.body.body
		});

		//save it to the database.
		await article.save()
			.then(article => {
				req.flash('success', 'Article created!');
				res.redirect('/articles');
			})
			.catch(err => console.log(err))
	} catch (err) {
		console.log(err)
	}
}

/**
 * Display a specified article.
 * 
 * @param req
 * @param res
 */
exports.show = async (req, res) => {
	try {
		// get the specified article by _id field.
		const article = await Article.findById(req.params.id);

		res.render('articles/show', {
			article: article,
			moment // momentjs for displaying date in a human readable format.
		});
	} catch (err) {
		console.log(err)
	}
}

/**
 * Display a form for updating a specified article.
 * 
 * @param req
 * @param res
 */
exports.edit = async (req, res) => {
	try {
		// get the specified article by _id field.
		const article = await Article.findById(req.params.id);

		res.render('articles/edit', {
			article: article,
			errors: [] // validation errors array.
		});
	} catch (err) {
		console.log(err)
	}
}

/**
 * Update a specified article.
 * 
 * @param req
 * @param res
 */
exports.update = async (req, res) => {
	try {
		//if validation fails then get all the errors.
		const errors = validationResult(req);

		// get the specific article.
		const article = await Article.findById(req.params.id);

		if (!errors.isEmpty()) {
			//return back to the view with validation errors
			// and form data.
			return res.render('articles/edit', {
				errors: errors.array(),
				title: req.body.title,
				body: req.body.body,
				article: article
			});
		}

		article.title = req.body.title;
		article.body = req.body.body;
		article.updated_at = Date.now();

		//save the updated article to the database
		await article.save()
			.then(article => {
				req.flash('success', 'Article updated!');
				res.redirect(`/articles/${article._id}`);
			})
			.catch(err => console.log(err));
	} catch (err) {
		console.log(err)
	}
}

/**
 * Delete a specified article from the database
 */
exports.destroy = async (req, res) => {
	try {
		await Article.deleteOne({ _id: req.params.id }, (err) => {
			if (err) return err; // unable to delete the article
			req.flash('success', 'Article deleted!')
			res.redirect('/articles');
		})
	} catch (err) {
		console.log(err)
	}
}