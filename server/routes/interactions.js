const express = require("express");
const jwtHelper = require("jsonwebtoken");
const UserModel = require("../models/User");
const InteractionModel = require("../models/Interact");
const MatchModel = require("../models/Match");



const router = express.Router();

router.post("/interact", async (req, res) => {
	const { User1, User2,value } = req.body;
	let interaction = await InteractionModel.findOne({ User2,User1 });


	if (interaction !== null) {
		interaction.push({p2swipe:val}); 
        if(interaction.p2swipe === true && interaction.p1swipe === true){
            // MatchModel.create({User1.name.concat(User2.name)},{[{User1},{User2}]});//check if there is string concentation
			MatchModel.create({User1.name.concat(User2.name)},{[{User1.id},{User2.id}]});
		} 
	} else{
        InteractionModel.create({User1,value,User2,null});
    }
    

	const token = jwtHelper.sign(
		{
			userId: user._id,
			userName: user.name,
		},
		process.env.JWT_SECRET
	);
	res.send({ token });
});


module.exports = router;