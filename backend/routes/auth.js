const router = require('express').Router()
const {catchErrors} =  require('../middlewares/catchErrors')
const passport = require('../config/passport');
const uploadCloud= require('../config/cloudinary')
const {registerUser, userLogin, logout, getProfile, getAllUsers} = require('../controllers/usercontroller')

//profile
const {editProfile, deleteInfluences} = require('../controllers/profilecontroller')
//playlist
const {addTracks, deleteTrack, getPlaylist} = require('../controllers/playlistcontroller')
///////////////////////////////////////////////////////////////////
// post
const {createPost, userPost, editPost, deletePost} = require('../controllers/postcontroller')

router.post('/signup', catchErrors(registerUser));

router.get('/allUsers',  getAllUsers)

router.post('/login', passport.authenticate('local'), userLogin);

router.get('/logout', logout);

router.post('/profile', catchErrors(getProfile));

///////////////////////////////////////////////////////////////////
//profile routes
router.post('/editProfile', isAuth, uploadCloud.single('img'), catchErrors(editProfile))

router.delete('/deleteMI/:id', isAuth, catchErrors(deleteInfluences))

///////////////////////////////////////////////////////////////////
//posts routes  
router.post('/createPost',  catchErrors(createPost))

router.get('/userPost',  userPost)

router.post('/editPost/:id',  catchErrors(editPost))

router.delete('/deletePost/:id', catchErrors(deletePost))

///////////////////////////////////////////////////////////////////
//playlist
router.post('/addTracks', catchErrors(addTracks))

router.delete('/deleteTrack/:id', catchErrors(deleteTrack))

router.get('/getPlaylist', getPlaylist)

////////////////////////////////////////////////////////////////////
//auth
function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
