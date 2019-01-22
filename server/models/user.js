const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		require: true,
		unique: true
	},
	//	User is required to have a password, but that's it.
	password: {
		type: String,
		required: true
	},
	profileImageUrl: {
		type: String
	}
});

//adding the user hook right here
//This will hash the user data for security before storing
//pre.(save) is the hook
//Try block tells the processor not to rehash the password if it hasn't been changed
userSchema.pre('save', async function(next){
	try {
		if(!this.isModified('password')){
			return next();
		}
		let hashedPassword = await bcrypt.hash(this.password, 10); //10 is a salt factor
		this.password = hashedPassword;
		return next();
	}	catch(err) {
		return next(err);
	}
});
//User password will be matched against the one in the hash
//Will also be stored across pages
userSchema.method.comparePassword = async function(candidatePassword, next){
	try {
		let isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch (err) {
		return next(err);
	}
};

const User = mongoose.model('User', userSchema);

module.exports = User;
