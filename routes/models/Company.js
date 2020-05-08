const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CompanySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
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
  fieldofResearch: {
    type: String,
    require: true,
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

module.exports = Company = mongoose.model("company", CompanySchema);
