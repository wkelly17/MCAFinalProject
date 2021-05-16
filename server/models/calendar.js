const mongoose = require('mongoose');

// By default, Mongoose adds an _id property to your schemas.

const calendarSchema = new mongoose.Schema(
  {
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },

    currentlyDroppedIn: {
      type: String,
    },
    //  meal: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Recipe',
    //  },
  },
  {
    timestamps: true,
    toJson: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// calendarSchema.virtual('meal', [
//   {
//     ref: 'Recipe',
//     localField: 'recipeId',
//     foreignField: '_id',
//   },
// ]);

const Calendar = mongoose.model('Calendar', calendarSchema);

module.exports = Calendar;
