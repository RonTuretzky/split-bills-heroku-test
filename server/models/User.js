const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	phone: { type: String, required: true },
	password: { type: String, required: true, select: false },
	profile: { type: String, required: false },
	yeechor: { type: Boolean },
	image: { type: Buffer, required: false },
});

module.exports = mongoose.model("User", userSchema);
