const express = require('express');
const Calendar = require('../models/calendar');
// const auth = require('../middleware/auth')
const router = new express.Router();

// TODO: ADD AUTH layer;
router.post('/calendar/update', async (req, res) => {
  try {
    const calendar = new Calendar({
      ...req.body,
      //  owner: req.user._id,
    });
    await calendar.save();
    return res.status(201).send(calendar);
  } catch (e) {
    console.log(e);
    return res.status(400).send(e);
  }
});

// todo: auth layer
router.get('/calendar', async (req, res) => {
  // todo: save another calendar meal after revising model
  Calendar.find()
    .populate('recipe')
    .exec()
    .then((days) => {
      res.status(200).json({
        meals: days.map((day) => {
          return day;
        }),
      });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// todo: auth layer
router.delete('/calendar/:id', async (req, res) => {
  try {
    const meal = await Calendar.findOneAndDelete({
      _id: req.params.id,
      // owner: req.user._id,
    });

    if (!meal) {
      res.status(404).send();
    }

    res.send(meal);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

router.patch('/calendar/:id', async (req, res) => {
  const updates = Object.keys(req.body);

  // todo: auth;  req.user_id = auth layer attached to request;
  ///- const allowedUpdates = ['description', 'completed']
  ///- const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  try {
    const meal = await Calendar.findOne({
      _id: req.params.id,
      //todo:  owner: req.user._id,
    });

    if (!meal) {
      console.log('no meal');
      return res.status(404).send();
    }

    updates.forEach((update) => (meal[update] = req.body[update]));
    await meal.save();
    res.send(meal);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

module.exports = router;
