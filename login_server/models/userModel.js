const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: { type: String },
  lastName: { type: String },
  email: { type: String },
  password: { type: String },
  date: { type: String },
});

userSchema.statics.EncryptPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

module.exports = mongoose.model("User", userSchema);
