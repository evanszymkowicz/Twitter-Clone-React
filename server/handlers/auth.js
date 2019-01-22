const db = require('../models/');
const jwt = require('jsonwebtoken');

exports.signin = function() {};

exports.signup = async function(req, res, next) {
	try {
		// create a user
		let user = await db.User.create(req.body);
		// create a token (signing)
		let { id, username, profileImageUrl } = user
		let token = jwt.sign({
			id
			username,
			profileImageUrl
		},
		// process.env.SECRET_KEY
		process.env.SECRET_KEY
	);
	return res.status(200).json({
		id,
		username,
		profileImageUrl,
		token
	});
// see what kind of error
} catch(err){
		//if validation fails:
		if(err.code === 11000){
		// specific errros will refer to taken email. etc
			err.message = 'sorry, that username or email is already taken';
		}
		// send generic error 404 or specific
		return next({
			status: 400,
			message: err.message
		});
	}
};
