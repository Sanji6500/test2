const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const mechants = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: [3, "minimum name character is 3"],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, " Email is already exists"],
    },
    password: {
      type: String,
    },
    restPasswordToken: String,
    restPasswordExpire: Date,
  },
  { collection: "merchant-data" }
);

mechants.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
mechants.methods.matchPasswords = async function (passwords) {
  return await bcrypt.compare(passwords, this.password);
};
mechants.methods.getSigndtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("mechants-data", mechants);
