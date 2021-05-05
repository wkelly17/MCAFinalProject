const mongoose = require('mongoose');

// By default, Mongoose adds an _id property to your schemas.

const calendarSchema = new mongoose.Schema({
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
  currentlyDroppedIn: {
    type: String,
  },
});

const Task = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
