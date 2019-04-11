//database create korte

const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
	place: {
		type: String,
		required: true
	},
	country: {
		type: String,
		required: true
	},
	description: { 
		type: String
	},
	image: {
		type: mongoose.Schema.Types.Mixed
	}
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
