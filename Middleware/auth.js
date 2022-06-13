const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const merchantModel = require("../models/mechants_model");
const [CustomerModel] = require("../models/customer_model");

exports.protect_all = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(res.json("not Authorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await CustomerModel.findById(decoded.id);

    const user = await userModel.findById(decoded.id);
    const merchant = await merchantModel.findById(decoded.id);

    if (!user && !merchant && !customer) {
      return next(res.json("aaaa not found"));
    }
    if (user) {
      req.user = user;
    } else if (merchant) {
      req.merchant = merchaeyeent;
    } else if (customer) {
      x;
      req.customer = customer;
    }

    next();
  } catch (error) {
    return next(res.json("No Authorized " + error));
  }
};

exports.protect_merchentse = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(res.json("not Authorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    const merchant = await merchantModel.findById(decoded.id);

    if (!user && !merchant) {
      return next(res.json("user not found"));
    }
    if (user) {
      req.user = user;
    } else if (merchant) {
      req.merchant = merchant;
    }

    next();
  } catch (error) {
    return next(res.json("No Authorized " + error));
  }
};
exports.protect_admin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(res.json("not Authorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return next(res.json("user not found"));
    } else if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    return next(res.json("No Authorized " + error));
  }
};
