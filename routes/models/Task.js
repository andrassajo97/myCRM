const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TaskSchema = new Schema({
  user: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  research:
  {
    type: Object
  }
});

module.exports = Task = mongoose.model("task", TaskSchema);
