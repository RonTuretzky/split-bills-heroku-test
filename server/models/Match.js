const mongoose = require("mongoose");
const { Schema } = mongoose;

const matchSchema = new Schema({
	name: { type: String, required: true },
	members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	expenses: {
		type: [
			{
				title: { type: String, required: true }
			},
		],
	},
});

module.exports = mongoose.model("Match", matchSchema);
