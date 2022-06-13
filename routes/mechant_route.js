const router = require("express").Router();

const mechantsModel = require("../models/mechants_model");

router.post("/add", async (req, res) => {
  const { username, email, password } = req.body;
  const addUser = new mechantsModel({ username, email, password });

  addUser
    .save()
    .then(() => sendtoken(addUser, 201, res))
    .catch((err) => res.json("mechantError :" + err));
});

router.post("/findEmail", async (req, res) => {
  mechantsModel
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) res.json("Email is Allready exist");
      else res.json(null);
    })
    .catch((err) => res.json("++++" + err));
});
////-------------------------------------------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await mechantsModel.findOne({ email }).select("+password");
    if (!user) return res.json("Email is not exist");
    const isMatch = await user.matchPasswords(password);
    if (!isMatch) return res.json("Password is Wrong");
    sendtoken(user, 200, res);
  } catch (error) {
    res.json("mechantsModel" + error);
  }
});

////------------------------------------------------------------------
const sendtoken = (merchant, statusCode, res) => {
  const token = merchant.getSigndtToken();
  res.json(token);
};

module.exports = router;
