const express = require('express');
const Folder = require('../models/folders');
// const auth = require('../middleware/auth')
const router = new express.Router();

router.post('/folder', async (req, res) => {
  // Insert many takes an array of objects...

  //   Shortcut for validating an array of documents and inserting them into MongoDB if they're all valid. This function is faster than .create() because it only sends one operation to the server, rather than one for each document.

  // Mongoose always validates each document before sending insertMany to MongoDB. So if one document has a validation error, no documents will be saved, unless you set the ordered option to false.

  try {
    let results = await Folder.insertMany(req.body);
    return res.status(201).send(results);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
});

router.get('/folder', async (req, res) => {
  try {
    //  await req.user.populate('recipes').execPopulate();
    let folders = await Folder.find();
    res.json(folders);
  } catch (e) {
    res.status(500).json();
  }
});

// todo: auth layer
router.delete('/folder/:id', async (req, res) => {
  try {
    const meal = await Folder.findOneAndDelete({
      _id: req.params.id,
      // owner: req.user._id,
    });

    if (!meal) {
      res.status(404).send();
    }

    res.send(meal);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
