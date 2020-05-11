const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Input Validation
const validateResearchInput = require("../../validation/research");
const validateStageInput = require("../../validation/stage");

// Load Research Model
const Research = require("../models/Research");
// Load Student Model
const Student = require("../models/Student");
// Load Company Model
const Company = require("../models/Company");
// Load User Model
const User = require("../models/User");

// @route   POST api/research/
// @desc    Create Research
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateResearchInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Research.findOne({ name: req.body.name }).then((research) => {
      if (research) {
        errors.name = "A kutatás már létezik!";
        return res.status(400).json(errors);
      } else {
        const newResearch = new Research({
          name: req.body.name,
          company: req.body.company,
          student: req.body.student,
          subject: req.body.subject,
          companyID: req.user.id,
          from: req.body.from,
          to: req.body.to,
          desc: req.body.desc,
          isCompleted: false,
          assigned: req.body.assigned,
        });

        newResearch.save().then((research) => res.json(research));
      }
    });
  }
);

// @route   GET api/research/all
// @desc    Get all researches
// @access  Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.find()
      .then((researches) => res.json(researches))
      .catch((err) =>
        res.status(404).json({ noresearchesfound: "Nincsenek kutatások" })
      );
  }
);

// @route   GET api/research/completed
// @desc    Get completed researches
// @access  Private
router.get(
  "/completed",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.find({ isCompleted: true })
      .then((researches) => res.json(researches))
      .catch((err) =>
        res
          .status(404)
          .json({ noresearchesfound: "Nincsenek befejezett kutatások" })
      );
  }
);

// @route   GET api/research/waitlist
// @desc    Get researches waiting for students
// @access  Private
router.get(
  "/waitlist",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.find({ assigned: false })
      .then((researches) => res.json(researches))
      .catch((err) =>
        res
          .status(404)
          .json({ noresearchesfound: "Nincsenek jelentkezőre váró kutatások" })
      );
  }
);

// @route   GET api/research/in_progress
// @desc    Get researches in progress
// @access  Private
router.get(
  "/in_progress",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.find({ assigned: true })
      .then((researches) => res.json(researches))
      .catch((err) =>
        res
          .status(404)
          .json({ noresearchesfound: "Nincsenek folyamatban lévő kutatások" })
      );
  }
);

// @route   GET api/research/:id
// @desc    Get research by id
// @access  Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.findById(req.params.id)
      .then((research) => res.json(research))
      .catch((err) =>
        res.status(404).json({ noresearchesfound: "Kutatás nem található" })
      );
  }
);

// @route   GET api/research/get/byuser_name
// @desc    Get research by the logged in user's name
// @access  Private
router.get(
  "/get/byuser_name",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const name = req.user.name;

    Research.find({ $or: [{ student: name }, { company: name }] })
      .then((researches) => res.json(researches))
      .catch((err) =>
        res.status(404).json({ noresearchesfound: "Kutatások nem található" })
      );
  }
);

// @route   POST api/research/edit/:id
// @desc    Edit research
// @access  Private
router.post(
  "/edit/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateResearchInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Research.findById(req.params.id)
      .then((research) => {
        research.name = req.body.name;
        research.company = req.body.company;
        research.student = req.body.student;
        research.assigned = req.body.assigned;
        research.subject = req.body.subject;
        research.from = req.body.from;
        research.to = req.body.to;
        research.desc = req.body.desc;
        research.isCompleted = req.body.isCompleted;

        research.save().then = (() => res.json(player)).catch((err) =>
          res.status(400).json(err)
        );
      })
      .catch((err) => res.status(400).json(err));
  }
);

// @route   POST api/research/assign/:id
// @desc    Assign to a research
// @access  Private
router.post(
  "/assign/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.findOne({ user: req.user.id }).then((student) => {
      Research.findById(req.params.id)
        .then((research) => {
          research.student = student.name;
          research.studentID = req.user.id;
          research.assigned = true;

          research.save().then((research) => res.json(research));
        })
        .catch((err) =>
          res.status(404).json({ researchnofound: "Kutatás nem található" })
        );
    });
  }
);

// @route   POST api/research/disapprove/:id
// @desc    Assign to a research
// @access  Private
router.post(
  "/disapprove/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Student.findOne({ user: req.user.id }).then((student) => {
      Research.findById(req.params.id)
        .then((research) => {
          research.student = "";
          research.assigned = false;

          //  Save
          research.save().then((research) => res.json(research));
        })
        .catch((err) =>
          res.status(404).json({ researchnofound: "Kutatás nem található" })
        );
    });
  }
);

// @route   POST api/research/:id/stage
// @desc    Create stage to the research
// @access  Private
router.post(
  "/:id/stage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStageInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Research.findById(req.params.id).then((research) => {
      const newStage = {
        num: research.stage.length,
        title: req.body.title,
        desc: req.body.desc,
        deadline: req.body.deadline,
        isCompleted: req.body.isCompleted,
        company: research.company,
        student: research.student,
      };

      //    Add to stage array
      research.stage.push(newStage);

      research.save().then((research) => res.json(research));
    });
  }
);

// @route   Get api/research/:id/stage/:num
// @desc    Get stage by id
// @access  Private
router.get(
  "/:id/stage/:num",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.findById(req.params.id).then((research) => {
      res.json(research.stage[req.params.num]);
    });
  }
);

// @route   Get api/research/:id/stage/get/all
// @desc    Get all stages by research id
// @access  Private
router.get(
  "/:id/stage/get/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.findById(req.params.id).then((research) => {
      res.json(research.stage);
    });
  }
);

// @route   POST api/research/:id/stage/:num/edit
// @desc    Edit stage by id
// @access  Private
router.post(
  "/:id/edit-stage/:num",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateStageInput(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Research.findById(req.params.id)
      .then((research) => {
        research.stage[req.params.num].title = req.body.title;
        research.stage[req.params.num].desc = req.body.desc;
        research.stage[req.params.num].deadline = req.body.deadline;
        research.stage[req.params.num].isCompleted = req.body.isCompleted;

        research
          .save()
          .then((research) => res.json(research.stage[req.params.num]));
      })
      .catch((err) =>
        res.status(404).json({ nofoundstage: "Folyamat nem található!" })
      );
  }
);

// @route   POST api/research/:id/stage/:num/comment
// @desc    Add comment to stage
// @access  Private
router.post(
  "/:id/stage/:num/comment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.findById(req.params.id)
      .then((research) => {
        const newComment = {
          user: req.body.user,
          text: req.body.text,
          name: req.body.name,
          user: req.body.id,
        };

        // Add to comments array
        research.stage[req.params.num].comments.push(newComment);

        // Save
        research
          .save()
          .then((research) => res.json(research.stage[req.params.num]));
      })
      .catch((err) =>
        res.status(404).json({ researchnotfound: "Kutatás nem található!" })
      );
  }
);

// @route   DELETE api/research/:id/stage/:num/comment/:id2
// @desc    Remove comment from stage
// @access  Private
router.delete(
  "/:id/stage/:num/comment/:id2",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.findById(req.params.id)
      .then((research) => {
        // Check to see if comment exists
        if (
          research.stage[req.params.num].comments.filter(
            (comment) => comment._id.toString() === req.params.id2
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnoexists: "Komment nem létezik!" });
        }

        // Get remove index
        const removeIndex = research.stage[req.params.num].comments
          .map((item) => item._id.toString())
          .indexOf(req.params.id2);

        // Splice comment out of array
        research.stage[req.params.num].comments.splice(removeIndex, 1);

        research
          .save()
          .then((research) =>
            res.json(research.stage[req.params.num].comments)
          );
      })
      .catch((err) =>
        res.status(404).json({ researchnotfound: "Kutatás nem található!" })
      );
  }
);

// @route   DELETE api/research/:id/stage/:id2
// @desc    Remove stage from research
// @access  Private
router.delete(
  "/:id/stage/:id2",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Research.findById(req.params.id)
      .then((research) => {
        // Check to see if stage exists
        if (
          research.stage.filter(
            (stage) => stage._id.toString() === req.params.id2
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ stagenoexists: "Folyamat nem létezik!" });
        }

        // Get remove index
        const removeIndex = research.stage
          .map((item) => item._id.toString())
          .indexOf(req.params.id2);

        // Splice stage out of array
        research.stage.splice(removeIndex, 1);

        research.save().then((research) => res.json(research.stage));
      })
      .catch((err) =>
        res.status(404).json({ researchnotfound: "Kutatás nem található!" })
      );
  }
);

// @route   DELETE api/research/:id/
// @desc    Delete research by id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Company.findOne({ user: req.user.id }).then((company) => {
      Research.findById(req.params.id)
        .then((research) => {
          // Check for research owner
          if (research.company.toString() !== company.name) {
            return res
              .status(401)
              .json({ notauthorized: "Felhasználónak nincs jogosultsága" });
          }

          // Delete
          research.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ researchnotfound: "Kutatás nem található!" })
        );
    });
  }
);

module.exports = router;
