const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  made: {
    type: String,
    enum: ['YES' , 'NO']
  },

  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String
}, {
  timestamps: true
})

const recipeSchema = new Schema({
  title: {
    type: String, 
    required: true
  },
  cuisine: { 
    type: String,
    required: true
  },
  ingredients: { 
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  addedBy: String,
  userAvatar: String,
  reviews: [reviewSchema]
}, {
  timestamps: true
})


module.exports = mongoose.model('Recipe', recipeSchema)