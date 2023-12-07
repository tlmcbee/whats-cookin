var express = require('express');
var router = express.Router();
const recipesCtrl = require('../controllers/recipes')
const ensureLoggedIn = require('../config/ensureLoggedIn')

/* GET users listing. */
router.get('/', recipesCtrl.index)
router.get('/new', ensureLoggedIn, recipesCtrl.new)
router.get('/:id', recipesCtrl.show)
router.post('/', ensureLoggedIn, recipesCtrl.create)
router.get('/:id/edit', ensureLoggedIn, recipesCtrl.edit)
router.put('/:id', ensureLoggedIn, recipesCtrl.update)
router.delete('/:id', ensureLoggedIn, recipesCtrl.delete)

module.exports = router;
