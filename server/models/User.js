const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	gender: {type: String, required: true, unique: true},
	attract_to: {type: String, required: true, unique: false},
	password: { type: String, required: true },
	matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
	relevant:[{type:mongoose.Schema.Types.ObjectId,ref:"person"}],
	swiped_yes:[{type:mongoose.Schema.Types.ObjectId,ref:"matched_person"}]

});

module.exports = mongoose.model("User", userSchema);
