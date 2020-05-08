const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Company Model
const Company = require("../models/Company.js");
// Load User Profile
const User = require("../models/User");

// Load Input Validation
const validateCompanyProfileInput = require("../../validation/companyProfile.js");

// @route   GET api/companyProfile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Company.findOne({ user: req.user.id })
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

/*// @route   GET api/companyProfile/:id
// @desc    Get profile by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Company.findById(req.params.id)
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "Cég nem található!";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);*/

// @route   GET api/companyProfile/:id
// @desc    Get profile by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Company.findOne( { user: req.params.id })
      .then((company) => {
        if (!company) {
          errors.nocompany = "Cég nem található!";
          return res.status(404).json(errors);
        }
        res.json(company);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @route   POST api/companyProfile
// @desc    Create user company-profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCompanyProfileInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const companyFields = {};
    companyFields.user = req.user.id;
    if (req.body.name) companyFields.name = req.body.name;
    if (req.body.city) companyFields.city = req.body.city;
    if (req.body.address) companyFields.address = req.body.address;
    if (req.body.postal) companyFields.postal = req.body.postal;
    if (req.body.fieldofResearch)
      companyFields.fieldofResearch = req.body.fieldofResearch;
    if (req.body.email) companyFields.email = req.body.email;
    if (req.body.phonenum) companyFields.phonenum = req.body.phonenum;

    Company.findOne({ user: req.user.id }).then((profile) => {
      if (profile) {
        // Update
        Company.findOneAndUpdate(
          { user: req.user.id },
          { $set: companyFields },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        // Create

        // Save profile
        new Company(companyFields).save().then((profile) => res.json(profile));
      }
    });
  }
);

// @route   GET api/companyProfile/all
// @desc    Get all company profiles
// @access  Private
router.get('/get/all', passport.authenticate("jwt", { session: false }), (req, res) => {
  Company.find()
    .then(companies => {
      if(!companies) {
        return res.status(404).json({ nocompanies: "Nincsenek cégek!"})
      }
      res.json(companies);
    })
    .catch(err => res.status(404).json({ nocompanies: "Nincsenek cégek!"}))
})

// @route   DELETE api/companyProfile
// @desc    Delete user and profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Company.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
