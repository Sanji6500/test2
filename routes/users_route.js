/// this Temp solution
// I must see Vid  from youtube
const router = require("express").Router();

const userModel = require("../models/user.model");
const usersModel = require("../models/user.model");

router.post("/add", async (req, res) => {
  const { username, email, password } = req.body;
  userModel.findOne({ email }).then((result) => {
    if (result)
      return res.json({ error: "Email is allready exist", success: false });
    else {
      const addUser = new usersModel({
        username,
        email,
        password,
      });
      addUser
        .save()
        .then(() => sendtoken(addUser, 201, res))
        .catch((err) => res.json("" + err));
    }
  });
});

////-------------------------------------------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersModel.findOne({ email }).select("+password");
    if (!user)
      return res.json({
        error: "Email is not exist",
        success: false,
        emailToken: true,
      });
    const isMatch = await user.matchPasswords(password);
    if (!isMatch)
      return res.json({
        error: "Password is Wrong",
        success: false,
        passwordToken: true,
      });
    sendtoken(user, 200, res);
  } catch (error) {
    res.json("user" + error);
  }
});
const sendtoken = (user, statusCode, res) => {
  const token = user.getSigndtToken();
  res.json(token);
};

module.exports = router;
