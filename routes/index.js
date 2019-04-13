const express = require('express');
const router = express.Router();
const {
	ensureAuthenticated
} = require('../config/auth');

const Admin = require('../models/Admin'); //admin model

router.get('/', (req, res) => res.render('welcome')); //welcome page
router.get('/insert', ensureAuthenticated, (req, res) => res.render('insert')); //insert page
//router.get('/list', ensureAuthenticated, (req, res) => res.render('list')); //insert page

//save handle
router.post('/insert', (req, res) => {
    const {
        place,
        country,
        description
    } = req.body;
    
    const newAdmin = new Admin({
        place,
        country,
        description
    });
    //save places
    newAdmin.save().then(user => {
        req.flash('success_msg', 'You have successfully inserted informations');
        res.redirect('/insert'); //successfully insert howar por ***** page a chole jabe
    }).catch(err => console.log(err));
    //save places
}); 
//save handle

// //update
// router.get('/list', (req, res) => {
//     const {
//         place,
//         country,
//         description
//     } = req.body;
    
//     const updateAdmin = new Admin({
//         place,
//         country,
//         description
//     });
//     exports.updateAdmin = (req, res) => {
//         Admin.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, updateAdmin) => {
//             if (err) return next(err);
//             res.send('Updated.');
//         });
//     };
// });
// //update

// //update
// function updateRecord(req, res) {
//     Admin.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
//         res.render("/addOrEdit", {
//             viewTitle: 'Update Employee',
//             employee: req.body
//         });
//     });
// }
// //update

// DELETE
// router.get('/delete/:id', (req, res) => {
//     Admin.findOneAndDelete(req.params.id, (err, doc) => {
//         if (!err) {
//             res.redirect('/list');
//         }
//         else { console.log('Error in delete :' + err); }
//     });
// });
//delete

// READ (ALL)
router.get('/list', (req, res) => {
    Admin.find((err, docs) => {
      if (!err) {
          res.render("list", {
              list: docs
          });
      }
      else {
          console.log('Error in retrieving list :' + err);
      }
  });
});
// READ (ALL)

module.exports = router;
