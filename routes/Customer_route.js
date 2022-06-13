const router = require("express").Router();

const customer_model = require("../models/customer_model");

router.post("/add", async (req, res) => {
  const addCustomer = new customer_model({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  addUser
    .save()
    .then(() => sendtoken(addCustomer, 201, res))
    .catch((err) => res.json("" + err));
});

router.post("/findEmail", async (req, res) => {
  customer_model
    .findOne({ email: req.body.email })
    .then((user) => {
      if (user) res.json("Email is Allready exist");
      else res.json(null);
    })
    .catch((err) => res.json("++++" + err));
  sendtoken({ email: req.body.email }, 200, res);
});
////-------------------------------------------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  customer_model
    .findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) res.json("Email is not exist");
      isMatch = customer_model.matchPasswords(password);
      if (!isMatch) res.json("Password is Wrong");

      sendtoken(user, 200, res);
    })
    .catch((err) => res.json("++++" + err));
});
const sendtoken = (user, statusCode, res) => {
  const token = customer_model.getSigndtToken();
  res.json(token);
};
////-------------------------------------------------------------

module.exports = router;
