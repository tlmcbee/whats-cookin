const Recipe = require('../models/recipe')

module.exports = {
  new: newRecipe,
  create,
  index,
  show,
  edit,
  update,
  delete: deleteRecipe,
  stirPot
}

async function newRecipe(req, res) {
  res.render('recipes/new', { title: 'Add Recipe', errorMsg: ''})
}

async function create(req, res) {
  req.body.user = req.user._id
  req.body.addedBy = req.user.name
  req.body.userAvatar = req.user.userAvatar
  try{
    const recipe = await Recipe.create(req.body)
    res.redirect(`/recipes/${recipe._id}`)
  } catch(err) {
    console.log(err)
    res.render('recipes/new', { errorMsg: err.message })
  }
}

async function index(req, res) {
  const recipes = await Recipe.find({})
  res.render('recipes/index', { title: 'All Recipes', recipes})
}

async function show(req, res) {
  const recipe = await Recipe.findById(req.params.id)
  res.render('recipes/show', { title: 'Recipe Details' , recipe})
}

async function edit(req, res) {
  const recipe = await Recipe.findOne( {_id: req.params.id, user: req.user._id})
  if(!recipe) return res.redirect('/recipes')
  res.render('recipes/edit', { title: 'Edit this Recipe', recipe})
}

async function update(req, res) {
  try{
    const updatedRecipe = await Recipe.findOneAndUpdate(
    {_id: req.params.id, user: req.user._id},
    req.body,
    {new: true}
    )
    return res.redirect(`/recipes/${updatedRecipe._id}`)
  } catch(err){
    console.log(err)
    res.render('recipes/edit', { errorMsg: err.message})
  }
}

async function deleteRecipe(req, res) {
  await Recipe.findOneAndDelete(
    {_id: req.params.id, user: req.user._id}
  )
  res.redirect('/recipes')
}

async function stirPot(req, res) {
  const recipe = await Recipe.aggregate([ { $sample: { size: 1 } } ])
  res.redirect(`/recipes/${recipe[0]._id}`)
}