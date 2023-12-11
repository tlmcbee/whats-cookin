const Recipe = require('../models/recipe')

module.exports = {
  create,
  delete: deleteReview, 
  edit,
  update
}

async function create(req, res) {
  const recipe = await Recipe.findById(req.params.id)
  req.body.user = req.user._id
  req.body.userName = req.user.name
  req.body.userAvatar = req.user.avatar
  recipe.reviews.push(req.body)
  try{
    await recipe.save()
  } catch(err) {
    console.log(err)
  }
  res.redirect(`/recipes/${recipe._id}`)
}

async function deleteReview(req, res) {
  const recipe = await Recipe.findOne({ 'reviews._id': req.params.id , 'reviews.user': req.user._id})
  if(!recipe) return res.redirect(`/recipes`)
  recipe.reviews.remove(req.params.id)
  await recipe.save()
  res.redirect(`/recipes/${recipe._id}`)
}

async function edit(req, res) {
  const recipe = await Recipe.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id})
  const review = recipe.reviews.id(req.params.id)
  res.render('reviews/edit', { title: 'Edit Review', review})
}

async function update(req, res) {
  const recipe = await Recipe.findOne({ 'reviews._id': req.params.id, 'reviews.user': req.user._id})
  const reviewSubdoc = recipe.reviews.id(req.params.id)
  if(!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/recipes/${recipe._id}`)
  reviewSubdoc.content = req.body.content
  reviewSubdoc.made = req.body.made
  try {
    await recipe.save()
  } catch(err) {
    console.log(err)
  }
  res.redirect(`/recipes/${recipe._id}`)
}