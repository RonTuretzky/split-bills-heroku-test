const express = require("express");
const UserModel = require("../models/User");
const mongoose = require('mongoose')
const LikeModel = require('../models/like')
const router = express.Router();		//Router leverging mongoose to user models to add 
										// instances of liking/disliking. 
										//Interact creates a "Like" db instance
										// Match fetches all users who current user has liked 
										// and have liked back 
										//Available fetches all user with no existing like/dislike 
										//from current user



router.post("/interact", async (req, res) => {
	const from = req.user.userId;
	const { to, like } = req.body;
	if (from === to) {
		res.sendStatus(400);
	}
	try {
		await LikeModel.create({ from, to, like });
	} catch (err) {
		res.sendStatus(400);
		return;
	}

	res.sendStatus(200);
});

router.get('/matches', async (req, res) => {
	const currentUser = req.user.userId;
	const likedByUser = await LikeModel.find({ from: currentUser, like: true }).lean();
	let likedTheUser = (await LikeModel.find({ to: currentUser, like: true }).lean()).map(x => x.from.toString());
	const matches = likedByUser.filter(like => likedTheUser.includes(like.to.toString()));
	const results = await UserModel.find({
		_id: matches.map(x => new mongoose.Types.ObjectId(x.to))
	}).select(['_id', 'name', 'phone']).lean();
	res.send(results);
})

router.get('/available', async (req, res) => {
	const currentUser = req.user.userId;
	const likedByUser = await LikeModel.find({ from: currentUser }).select(['-_id', 'to']).lean();
	const ids = likedByUser.map(x => x.to);
	const people = await UserModel.find({
		_id: {
			$nin: [currentUser, ...ids].map(mongoose.Types.ObjectId)
		}
	}).lean()
	res.send(people);
})

module.exports = router;