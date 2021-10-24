const mongoose = require("mongoose");

const { validator } = require("../utils");

const internSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.validateEmail,
      message: "Please fill a valid email address",
      isAsync: false,
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.validateMobile,
      message: "Please fill a valid email address",
      isAsync: false,
    },
  },
  collegeId: { type: mongoose.Types.ObjectId, refs: "college" },
  isDeleted: { type: Boolean, default: false, trim: true },
});

module.exports = mongoose.model("Intern", internSchema, "interns")
