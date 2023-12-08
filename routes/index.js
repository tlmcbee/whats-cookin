var express = require('express');
var router = express.Router();

const passport = require('passport')
const recipesCtrl = require('../controllers/recipes')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "What's Cooking?" });
});

router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  }
))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
))

router.get('/logout', function(req, res) {
  req.logout(function() {
    res.redirect('/')
  })
})

router.get('/recipes/stir/', recipesCtrl.stirPot)
module.exports = router;
