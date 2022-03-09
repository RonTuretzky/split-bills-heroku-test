const mongoose = require("mongoose");
const { Schema } = mongoose;

const likeSchema = new Schema({
	from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	like: { type: Boolean, required: true }
});

likeSchema.index({ from: 1, to: 1 }, { unique: true })
module.exports = mongoose.model("Like", likeSchema);
