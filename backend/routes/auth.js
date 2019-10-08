const router = require('express').Router()
const {catchErrors} =  require('../middlewares/catchErrors')
const passport = require('../config/passport');
const uploadCloud= require('../config/cloudinary')
const {registerUser, userLogin, logout, getProfile, getAllUsers} = require('../controllers/usercontroller')

//profile
const {editProfile, deleteInfluences} = require('../controllers/profilecontroller')

///////////////////////////////////////////////////////////////////
// post
const {createPost, userPost, editPost, deletePost} = require('../controllers/postcontroller')

router.post('/signup', catchErrors(registerUser));

router.get('/allUsers', isAuth, getAllUsers)

router.post('/login', passport.authenticate('local'), userLogin);

router.get('/logout', logout);

router.post('/profile', catchErrors(getProfile));

///////////////////////////////////////////////////////////////////
//profile routes
router.post('/editProfile', isAuth, uploadCloud.single('img'), catchErrors(editProfile))

router.delete('/deleteMI/:id', isAuth, catchErrors(deleteInfluences))

///////////////////////////////////////////////////////////////////
//posts routes  
router.post('/createPost', isAuth, catchErrors(createPost))

router.get('/userPost', isAuth, userPost)

router.post('/editPost/:id', isAuth, catchErrors(editPost))

router.delete('/deletePost/:id', isAuth, catchErrors(deletePost))

///////////////////////////////////////////////////////////////////
//auth
function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
