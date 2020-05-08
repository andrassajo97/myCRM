const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ResearchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: Object
  },
  studentID: {
    type: String
  },
  companyID: {
    type: String
  },
  student: {
    type: Object,
  },
  assigned: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean
  },
  stage: [
    {
      student: {
        type: String
      },
      company: {
        type: String,
      },
      num: {
        type: Number
      },
      title: {
        type: String
      },
      desc: {
        type: String
      },
      deadline: {
        type: Date
      },
      isCompleted: {
        type: Boolean
      },
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "users",
          },
          text: {
            type: String
          },
          name: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],
});

module.exports = Research = mongoose.model("research", ResearchSchema);
