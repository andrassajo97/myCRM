const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Student Model
const Student = require("../models/Student.js");
// Load User Profile
const User = require("../models/User");

// Load Input Validation
const validateStudentProfileInput = require("../../validation/studentProfile");

// @route   GET api/studentProfile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Student.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "Nincs profil a felhasználóhoz";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*// @route   GET api/studentProfile/:id
// @desc    Get profile by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Student.findById(req.params.id)
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "Diák nem található!";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);*/

// @route   GET api/studentProfile/:id
// @desc    Get profile by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Student.findOne( { user: req.params.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "Diák nem található!";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST api/studentProfile
// @desc    Create and update user student-profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStudentProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const studentFields = {};
    studentFields.user = req.user.id;
    if (req.body.name) studentFields.name = req.body.name;
    if (req.body.uni) studentFields.uni = req.body.uni;
    if (req.body.degree) studentFields.degree = req.body.degree;
    if (req.body.status) studentFields.status = req.body.status;
    if (req.body.city) studentFields.city = req.body.city;
    if (req.body.address) studentFields.address = req.body.address;
    if (req.body.postal) studentFields.postal = req.body.postal;
    if (req.body.email) studentFields.email = req.body.email;
    if (req.body.phonenum) studentFields.phonenum = req.body.phonenum;

    Student.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        Student.findOneAndUpdate(
          { user: req.user.id },
          { $set: studentFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        // Create

        // Save profile
        new Student(studentFields).save().then((profile) => res.json(profile));
      }
    });
  }
);

// @route   GET api/studentProfile/get/all
// @desc    Get all student profiles
// @access  Private
router.get('/get/all', passport.authenticate("jwt", { session: false }), (req, res) => {
  Student.find()
    .then(students => {
      if(!students) {
        return res.status(404).json({ nostudents: "Nincsenek diákok!"})
      }

      res.json(students);
    })
    .catch(err => res.status(404).json({ nostudents: "Nincsenek diákok!"}))
})

// @route   DELETE api/studentProfile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Student.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
