const mongoose = require('mongoose');
const User = require('./user');

//Messages will only be posted when they are tied to a specific user
const messageSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		maxLength: 280
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User' //has to match model name
	}
});

messageSchema.pre('remove', async function(next){
	try {
		//find user
		let user = await User.findById(this.userId);
		//remove id of the message from the user's list
		user.message.remove(this.id);
		//save
		await user.save()
		//return next
		return next();
	} catch (e) {
			return next(err);
	}
});

const Message = mongoose.model('Message', messageSchema)
module.exports = Message;
