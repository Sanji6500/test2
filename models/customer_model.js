const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const customer = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: [3, "minimum name characterf is 3"],
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
  { collection: "user-data" }
);
const alerts = new mongoose.Schema({
  Tags_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productadvertising-data",
  },
  Customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productadvertising-data",
  },
  SendAlert: Boolean,
});
///-----------------------------
customer.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(8);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
customer.methods.matchPasswords = async function (passwords) {
  return await bcrypt.compare(passwords, this.password);
};
customer.methods.getSigndtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

///-----------------------------
const Customer_data = mongoose.model("Customer-data", customer);
const Alerts_data = mongoose.model("Alerts-data", alerts);

module.exports = [Customer_data, Alerts_data];
