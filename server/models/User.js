const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true, lowercase: true },
	phone: { type: String, required: true },
	password: { type: String, required: true, select: false },
	profile: { type: String, required: true },
	yeechor: { type: Boolean },
	image: { type: Buffer, required: true },
});

module.exports = mongoose.model("User", userSchema);
