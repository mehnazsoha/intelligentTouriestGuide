const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

require('./config/passport')(passport); //passport config

const db = require('./config/keys').MongoURI; //mongodb config

//connect to mongodb
mongoose.connect(db, {
		useNewUrlParser: true
	})
	.then(() => console.log('Mongodb Connected'))
	.catch(err => console.log(err));
//connect to mongodb

//connect EJS
//ejs holo stylesheet. ejs file a bootstrap, html use kora jay. <% %> ata holo ejs er tag. <%= %> aeta diye result ba msg display kore.)
//Unbuffered code for conditionals <% code %>
//Escapes html by default with <%= code %>
//Unescaped buffering with <%- code %>
//Newline slurping with <% code -%> or <% -%> or <%= code -%> or <%- code -%>
//<%# comment %>
//<%/* comment */%>
app.use(expressLayouts);
app.set('view engine', 'ejs');
//connect EJS

app.use(express.urlencoded({
	extended: false
})); //Bodyparser (body-parser is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body)

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
})); //express-session

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//passport middleware

app.use(flash()); //connect flash(success msg r error msg dite use kora hoy)

//global variables 
//(different error a different color deyar jno.)
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});
//global variables 

app.use('/', require('./routes/index')); //routes
app.use('/users', require('./routes/users')); //routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
