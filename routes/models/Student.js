const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true
  },
  uni: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenum: {
    type: String,
    required: true,
  },
});

module.exports = Student = mongoose.model("student", StudentSchema);
