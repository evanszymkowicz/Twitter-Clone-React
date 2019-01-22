const db = require('../models/');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
	//finding a user
	try {
		let user = await db.User.findOne({
			email: req.body.email
		});
		let { id, username, profileImageUrl } = user;
		//checking if the password matches what was sent
		let isMatch = await user.comparePassword(req.body.password);
		if(isMatch){
			let token = jwt.sign({
				//ES2015 Object notation shorthand because keys and messages match
				id,
				username,
				profileImageUrl
			},
			process.env.SECRET_KEY
			//Sign and verifies tokens
		};
		//log in if if matches
		return res.status(200).json({
			id,
			username,
			profileImageUrl,
			token
		});
	}	else {
		return next({
			status: 400,
			message: "Invalid email or password."
		});
	} catch (e) {
		return next ({ status: 400, message: "Invalid email or password." });
	 }
	}
	let user = await db.User.findOne({
		email: req.body.email
	});
	let { id, username, profileImageUrl } = user;
	//checking if the password matches what was sent
	let isMatch = await user.comparePassword(req.body.password);
	if(isMatch){
		let token = jwt.sign({
			//ES2015 Object notation shorthand because keys and messages match
			id,
			username,
			profileImageUrl
		},
		process.env.SECRET_KEY
		//Sign and verifies tokens
	};
	//log in if if matches
	return res.status(200).json({
		id,
		username,
		profileImageUrl,
		token
	});
}	else {
	return next({
		status: 400,
		message: "Invalid email or username."
	});
}
};

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
