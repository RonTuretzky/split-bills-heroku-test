const jwt = require("express-jwt"); //Session Token authenticator 
module.exports = jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ["HS256"],
});
