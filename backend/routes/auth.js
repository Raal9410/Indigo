const router = require('express').Router()
const SpotifyWebApi = require('spotify-web-api-node')
const passport = require('../config/passport');
const uploadCloud= require('../config/cloudinary')
const {registerUser, userLogin, logout, getProfile} = require('../controllers/usercontroller')
const {catchErrors} =  require('../middlewares/catchErrors')

//profile
const {editProfile} = require('../controllers/profilecontroller')

router.post('/signup', catchErrors(registerUser));

router.get('/login', passport.authenticate('spotify'));
router.get('/login/callback', passport.authenticate('spotify', { failureRedirect: '/login' }), function(req, res) {// Successful authentication, redirect home.
  console.log('fdsafdnsakjfndsjklanfjkdslabfjdlsafjldsa PUTOS')  
  res.redirect('http://localhost:3006/profile');
  }
);
router.get('/logout', logout);

router.post('/profile', catchErrors(getProfile));


//profile routes
router.post('/editProfile', isAuth, uploadCloud.single('img'), catchErrors(editProfile))



function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
