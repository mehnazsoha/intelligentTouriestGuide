//authentication er jno passport use kora hoy
//login korar jno id pass na mille login hobe na

const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

//load user model
const User = require('../models/User');
module.exports = (passport) => {
	passport.use(
		new LocalStrategy({
			usernameField: 'email'
		}, (email, password, done) => {
			//Matching email
			User.findOne({
				email: email
			}).then(user => {
				if (!user) {
					return done(null, false, {
						message: 'This is not a registered emaail'
					});
				}
				//Matching email

				//matching password
				bycrypt.compare(password, user.password, (err, isMatch) => {
					if (err) throw err;
					if (isMatch) {
						return done(null, user);
					} else {
						return done(null, false, {
							message: 'Incorrect password'
						});
					}
				});
				//matching password
			}).catch(err => console.log(err));
		})
	);

	//serialize and deserialize user
	//In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request.
	//If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.
	// Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session.
	//In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
	//serialize and deserialize user
};
//load user model
