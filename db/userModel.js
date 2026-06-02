const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {type: String},
  last_name: {type: String},
  location: {type: String},
  description: {type: String},
  occupation: {type: String},
  login_name: {type: String},
  password: {type: String}
});

const Users = mongoose.model.Users || mongoose.model("Users", userSchema);

module.exports = Users;
