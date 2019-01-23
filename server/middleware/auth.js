require('dotenv').load();
const jwt = require('jsonwebtoken');

//make sure user is logged in (authentication):
exports.loginRequired = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1]; //bearer
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
			if(decoded) {
				return next();
			}	else {
				return next ({
					status: 401,
					message: 'Please log in first'
					//Standard error message kicks out regardless of problem
				});
			}
		});
	} catch(e) {
		return next({ status: 401, message: 'Please log in first' });
	}
};

//authorize user:
//prevents other users & unauthorized users from tampering
exports.ensureCorrectUser = function(req, res, next) {
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			if(decoded && decoded.id === req.params.id) {
				return next();
			} else {
				return next({
					status: 401,
					message: 'Unauthorized'
				});
			}
		});
	} catch(e) {
		return next ({ status: 401, message: 'unauthorized' });
	}
};
