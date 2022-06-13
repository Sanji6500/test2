const router = require("express").Router();
const upload = require("../Middleware/Upload");
const tags = require("../models/Tags_model");
/// i will see later
const [
  nothing,
  productMerchant,
  nothing2,
] = require("../models/ProductMerchants_model");

///----------------------------------------------------------------------------------

router.post("/add-tag", async (req, res) => {
  const { productName, productBarcode } = req.body;
  const id_product = await productMerchant
    .findOne({ productBarcode })
    .select("_id");
  const addAdvertis = new productadvertis({
    Category: id_product,
    productName,
  });

  addAdvertis
    .save()
    .then(() => res.json("Add save success"))
    .catch((err) => res.json("advertis errors :" + err));
});

module.exports = router;
