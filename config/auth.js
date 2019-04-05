//log in na kore jate main page a na jete pare
module.exports={
    ensureAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next;
        }
        req.flash('error_msg','Please log in to view this resource');
        res.redirect('/users/login');
    }
};