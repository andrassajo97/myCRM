const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Input Validation
const validateTaskInput = require("../../validation/task");

// Load Task Model
const Task = require("../models/Task");

// @route   POST api/task
// @desc    Create task
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTask = new Task({
      user: req.user,
      type: req.body.type,
      date: req.body.date,
      desc: req.body.desc,
      research: req.body.research,
    });

    newTask.save().then((task) => res.json(task));
  }
);

// @route   GET api/task
// @desc    Get all task
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.find()
      .then((tasks) => res.json(tasks))
      .catch((err) =>
        res.status(404).json({ noresearchesfound: "Feladatok nem találhatóak" })
      );
  }
);

// @route   GET api/task/:id
// @desc    Get task by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Task.findById(req.params.id)
      .then((tasks) => res.json(tasks))
      .catch((err) =>
        res
          .status(404)
          .json({ notasksfound: "Nincsenek feladatok" })
      );
  }
);

module.exports = router;
