const mongoose = require("mongoose"); //Schema representing the user with needed data

const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	password: { type: String, required: true, select: false },
	profile: { type: String, required: false },
	yeechor: { type: Boolean },
	image: { type: String, required: false },
});

module.exports = mongoose.model("User", userSchema);
