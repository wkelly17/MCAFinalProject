const mongoose = require('mongoose');

// By default, Mongoose adds an _id property to your schemas.

const folderSchema = new mongoose.Schema(
  {
    folderName: {
      type: String,
      required: true,
      unique: true,
    },
    //  meal: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Recipe',
    //  },
  },
  {
    timestamps: true,
  }
);

// calendarSchema.virtual('meal', [
//   {
//     ref: 'Recipe',
//     localField: 'recipeId',
//     foreignField: '_id',
//   },
// ]);

const Calendar = mongoose.model('Folder', folderSchema);

module.exports = Calendar;
