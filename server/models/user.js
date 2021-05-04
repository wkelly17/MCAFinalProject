const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Recipe = require('./recipe');
const {
  default: RecipeSingle,
} = require('../../client/containers/RecipeSingle');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Email is invalid');
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password cannot contain "password"');
        }
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
// # In other words, we can compute their recipes from the recipe having an owner;
userSchema.virtual('tasks', {
  ref: 'Recipe',
  localField: '_id',
  foreignField: 'owner',
});

// When a Mongoose document is passed to   , Mongoose converts the object into JSON. You can customize this by adding   as a method on the object. The method below removes the password and properties before sending the response back.
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// The authentication token will ensure that the client doesn’t need to log in every time they want to perform an operation on the server.
// ! 3 arguments;   1) data to embed in token, 2 secret phrase, and 3 expires in option
// The second is a secret phrase: This is used to issue and validate tokens, ensuring that the token data hasn’t been tampered with.
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  const user = this;
  await Recipe.deleteMany({ owner: user._id });
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
