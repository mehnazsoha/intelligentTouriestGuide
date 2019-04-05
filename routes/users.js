const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/User'); //user model

router.get('/login', (req, res) => res.render('login')); //login page
router.get('/register', (req, res) => res.render('register')); //register page

//register handle
router.post('/register', (req, res) => {
	const {
		name,
		email,
		password,
		password2
	} = req.body;

	//all kinds of error for register
	let errors = [];

	//checking required field
	if (!name || !email || !password || !password2) {
		errors.push({
			msg: 'Please fill all the fields'
		});
	}
	//checking required field

	//checking passwords match
	if (password !== password2) {
		errors.push({
			msg: 'Password do not natch'
		});
	}
	//checking passwords match

	//checking password length
	if (password.length < 8) {
		errors.push({
			msg: 'Password should be at least 8 characters'
		});
	}
	//checking password length

	if (errors.length > 0) {
		res.render('register', {
			errors,
			name,
			email,
			password,
			password2
		});
	} else {
		//validation passed
		User.findOne({
			email: email
		}).then(user => {
			if (user) {
				//user exits
				errors.push({
					msg: 'Email is already registered'
				});
				res.render('register', {
					errors,
					name,
					email,
					password,
					password2
				});
				//user exits
			} else {
				const newUser = new User({
					name,
					email,
					password
				});

				//hash password
				//(direct password show kore na. encrypted hoye jabe)
				bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash; //set password to hashed

					//save user
					newUser.save().
					then(user => {
						req.flash('success_msg', 'You have successfully registered in TourDe. Now you can log in');
						res.redirect('/users/login'); //successfully registered howar por login page a chole jabe
					}).catch(err => console.log(err));
					//save user
				}));
				//hash password
			}
		});
		//validation passed
	}
	//all kinds of error for register
});
//register handle

//login handle
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard', //home page link korte hobe
		failureRedirect: '/users/login',
		failureFlash: true
	})(req, res, next);
});
//login handle

//logout handle
router.get('/logout',(req,res)=>{
	req.logout();
	req.flash('success_msg','You are logged out');
	res.redirect('/users/login');
});
//logout handle

module.exports = router;
