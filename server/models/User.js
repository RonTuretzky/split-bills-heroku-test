const mongoose = require("mongoose");
const UserModel = require("../models/User");

const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	profile: {type:String, required:true},
	yeechor:{type:Boolean},
	matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],


});

module.exports = mongoose.model("User", userSchema);
