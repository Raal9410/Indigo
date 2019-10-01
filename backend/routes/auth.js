const router = require('express').Router()
const passport = require('../config/passport');
const {registerUser, userLogin, logout, getProfile} = require('../controllers/usercontroller')
const {catchErrors} =  require('../middlewares/catchErrors')


router.post('/signup', catchErrors(registerUser));

router.post('/login', passport.authenticate('local'), catchErrors(userLogin));

router.get('/logout', logout);

router.get('/profile', isAuth, getProfile);

function isAuth(req, res, next) {
  req.isAuthenticated() ? next() : res.status(401).json({ msg: 'Log in first' });
}

module.exports = router;
