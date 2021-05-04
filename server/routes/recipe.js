const express = require('express');
// const Recipe = require('../models/recipe)
// const auth = require('../middleware/auth')
const router = new express.Router();
const recipeScraper = require('recipe-scraper');

// TODO: ADD AUTH layer;
router.post('/recipes/scrape', async (req, res) => {
  try {
    let recipe = await recipeScraper(req.body.recipeurl);
    return res.json({
      recipe,
    });
  } catch (error) {
    res.status(400).send(e);
  }
});
router.post('/recipes/add', async (req, res) => {
  const recipe = new Recipes({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await recipe.save();
    res.status(201).send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
});

// todo: auth layer
router.get('/recipes', async (req, res) => {
  try {
    await req.user.populate('recipes').execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/recipes/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const recipe = await recipe.findOne({ _id, owner: req.user._id });

    if (!recipe) {
      return res.status(404).send();
    }

    res.send(recipe);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);

  // todo: auth;  req.user_id = auth layer attached to request;
  ///- const allowedUpdates = ['description', 'completed']
  ///- const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  try {
    const recipe = await Recipe.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!recipe) {
      return res.status(404).send();
    }

    updates.forEach((update) => (recipe[update] = req.body[update]));
    await recipe.save();
    res.send(recipe);
  } catch (e) {
    res.status(400).send(e);
  }
});

// todo: auth layer
router.delete('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!recipe) {
      res.status(404).send();
    }

    res.send(recipe);
  } catch (e) {
    res.status(500).send();
  }
});

// todo: AUTH LAYER
// router.post('/users/login', async (req, res) => {
// 	try {
// 		 const user = await User.findByCredentials(req.body.email, req.body.password)
// 		 const token = await user.generateAuthToken()
// 		 res.send({ user, token })
// 	} catch (e) {
// 		 res.status(400).send()
// 	}
// })

// router.post('/users/logout', auth, async (req, res) => {
// 	try {
// 		 req.user.tokens = req.user.tokens.filter((token) => {
// 			  return token.token !== req.token
// 		 })
// 		 await req.user.save()

// 		 res.send()
// 	} catch (e) {
// 		 res.status(500).send()
// 	}
// })

module.exports = router;
