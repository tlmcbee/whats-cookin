const Recipe = require('../models/recipe')

module.exports = {
  create
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