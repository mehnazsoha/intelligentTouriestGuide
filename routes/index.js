const express = require('express');
const router = express.Router();
const {
	ensureAuthenticated
} = require('../config/auth');

const Admin = require('../models/Admin'); //admin model

router.get('/', (req, res) => res.render('welcome')); //welcome page
router.get('/insert', ensureAuthenticated, (req, res) => res.render('insert')); //insert page

//save handle
router.post('/insert', (req, res) => {
    const {
		place,
		country,
        description,
        image
    } = req.body;

    const newAdmin = new Admin({
        place,
        country,
        description,
        image
    });

    //save places
    newAdmin.save().then(user => {
        req.flash('success_msg', 'You have successfully inserted informations');
        res.redirect('/insert'); //successfully insert howar por ***** page a chole jabe
    }).catch(err => console.log(err));
    //save places
}); 
//save handle

module.exports = router;
