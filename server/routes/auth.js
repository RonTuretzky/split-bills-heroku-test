const express = require("express");
const jwtHelper = require("jsonwebtoken");
const UserModel = require("../models/User"); //API interface to receive registration and login. 
											 // We use mongoose to leverage the usermodels 
											 //Directly connected to the mongodb to make query
											 // and creation calls.


const router = express.Router();

router.post("/register", async (req, res) => {
	const {name, profile_pic_storage,profile_string,phone_number,email } = req.body;
	let user = await UserModel.findOne({ email });
	if (user !== null) {
		return res.sendStatus(400);
	}
	user = await UserModel.create({
		name:name,
		phone:phone_number,
		profile:profile_string,
		email:email,
		password:req.body.password,
		image:profile_pic_storage,
		yeechor:req.body.yeechor
		});

	const token = jwtHelper.sign(
		{
			userId: user._id,
			userName: user.name,
		},
		process.env.JWT_SECRET
	);
	res.send({ token });
});
router.post("/delete", async (req, res) => {
	const currentUser = req.user.userId;
	let ret = await UserModel.deleteOne({currentUser})
	res.sendStatus(200);
});
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	let user = await UserModel.findOne({ email:email, password:password });
	if (user === null) {
		return res.sendStatus(400);
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