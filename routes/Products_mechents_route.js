const router = require("express").Router();
const upload = require("../Middleware/Upload");
const [
  productadvertis,
  productMerchant,
  category,
  HauptCategory,
] = require("../models/ProductMerchants_model");

router.post(
  "/add-product",
  upload.upload.single("productImages"),
  async (req, res) => {
    const {
      productName,
      subCategoryNameBasic,

      productDescription,
      productBarcode,
    } = req.body;
    const idSubCategoryNameBasic = await category
      .findOne({ subCategoryNameBasic })
      .select("_id");
    const addProduct = new productMerchant({
      category: idSubCategoryNameBasic,
      productName,
      productDescription,
      productBarcode,
      productImages: req.file.path,
    });

    addProduct
      .save()
      .then(() => res.json(" save success"))
      .catch((err) => res.json("add Product errors :" + err));
  }
);

router.post("/findImages", async (req, res) => {
  const { productName } = req.body;
  productMerchant
    .findOne({ productName })
    .select("productImages")
    .then((images) => {
      if (!images) return res.json("Please enter productname");
      res
        .json({
          productImages: " " + images.productImages,
        })
        .catch((err) => res.json("error find images"));
    });
});
let today = new Date().toISOString();
////  إستدعاء المنتجات اليومية
router.get("/allproducts", async (req, res) => {
  productadvertis
    .find({
      $and: [
        {
          advertisingStartDate: {
            $lt: today,
          },
          advertisingEndDate: {
            $gte: today,
          },
        },
      ],
    })
    .populate("product_id")
    .then((result) => res.json(result));
});

////////////---------------------------------------------------------
router.post("/add-SubCategory", async (req, res) => {
  const { categoryNameBasic, subCategoryNameBasic } = req.body;

  const idSubCategoryNameBasic = await HauptCategory.findOne({
    categoryNameBasic,
  }).select("_id");
  const addcategory = new category({
    category: idSubCategoryNameBasic,
    subCategoryNameBasic,
  });
  addcategory
    .save()
    .then(() => res.json("save success"))
    .catch((err) => res.json(" category errors :" + err));
});

router.post("/add-BasicCategory", async (req, res) => {
  const { categoryNameBasic } = req.body;
  const addcategory = new HauptCategory({
    categoryNameBasic,
  });
  addcategory
    .save()
    .then(() => res.json("Added It"))
    .catch((err) => res.json(" category errors :" + err));
});
router.get("/selectSubCategory", async (req, res) => {
  const { categoryNameBasic } = req.body;
  const idSubCategoryNameBasic = await HauptCategory.findOne({
    categoryNameBasic,
  }).select("_id");
  category
    .find({ category: idSubCategoryNameBasic })
    .select("subCategoryNameBasic")
    .then((r) => res.json(r));
});
router.get("/select-BasicCategory", async (req, res) => {
  HauptCategory.find().then((result) => res.json(result));
});

///----------------------------------------------------------------------------------

router.post("/add-advertis", async (req, res) => {
  const {
    priceAfterDiscount,
    priceBeforeDiscount,
    advertisingEndDate,
    advertisingStartDate,
    productName,
  } = req.body;
  const id_product = await productMerchant
    .findOne({ productName })
    .select("_id");
  const addAdvertis = new productadvertis({
    product_id: id_product,
    priceBeforeDiscount,
    priceAfterDiscount,
    productName,
    advertisingEndDate,
    advertisingStartDate,
  });

  addAdvertis
    .save()
    .then(() => res.json("save success"))
    .catch((err) => res.json("advertis errors :" + err));
});
///////////////////

router.get("/getAllProducts", async (req, res) => {
  await productMerchant
    .find()
    .select("productName")
    .then((result) => res.json(result));
});

router.get("/AlLAdvertis", async (req, res) => {
  await productadvertis
    .find()
    .populate("product_id")
    .then((result) => res.json(result));
});

module.exports = router;
