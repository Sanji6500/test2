const router = require("express").Router();
const {
  protect_all,
  protect_admin,
  protect_merchentse,
} = require("../Middleware/auth");
router.get("/", protect_all, (req, res, next) => {
  res.status(404).json("welcome" + req.user.email);
});
router.get("/admin", protect_admin, (req, res, next) => {
  res.status(404).json("welcome admin");
});
router.get("/merchents", protect_merchentse, (req, res, next) => {
  res.status(404).json("welcome merchents");
});

module.exports = router;
