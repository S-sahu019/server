const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
 
});

module.exports = mongoose.model("Users", userSchema);
