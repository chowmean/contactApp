var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ContactSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: Number,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	}
});
module.exports = mongoose.model('Contact', ContactSchema);