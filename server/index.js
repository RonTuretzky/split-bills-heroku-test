require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const interactionRouter = require("./routes/interactions");
const path = require('path');
const jwtMiddleware = require("./middleware/jwt");
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const PRODUCTION = process.env.NODE_ENV === 'production'

mongoose //Connection to the mongodb database 
	.connect(process.env.DB_URI, {

		auth: {
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("connected to DB"));


const app = express();
app.use(cors());
if (PRODUCTION) {
	app.use(express.static(path.resolve('build')));
}
app.use(express.json());
app.use('/api/auth', authRouter); //adding api endpoints
app.use('/api/interact', jwtMiddleware, interactionRouter);
if (PRODUCTION) {
	app.get('*', (req, res) => {
		res.sendFile(path.resolve('build/index.html'));
	})
}
app.listen(PORT);
