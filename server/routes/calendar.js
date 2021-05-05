const express = require('express');
// const Recipe = require('../models/recipe)
// const auth = require('../middleware/auth')
const router = new express.Router();

// TODO: ADD AUTH layer;
router.post('/calendar/update', async (req, res) => {
  try {
    let recipe = await recipeScraper(req.body.recipeurl);
    return res.json({
      recipe,
    });
  } catch (error) {
    res.status(400).send(e);
  }
});

// todo: auth layer
router.get('/calendar', async (req, res) => {
  try {
    await req.user.populate('recipes').execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// todo: auth layer
router.delete('/calendar/:id', async (req, res) => {
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

module.exports = router;
