const mongoose = require("mongoose");
const { Schema } = mongoose;

const interactSchema = new Schema({
    pair1:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    p1swipe:{type:Boolean},
    pair2:{ type: mongoose.Schema.Types.ObjectId, ref: "User" },
    p2swipe:{type:Boolean},
});

module.exports = mongoose.model("Interaction", interactSchema);
