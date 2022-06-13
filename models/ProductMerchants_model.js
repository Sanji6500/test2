const mongoose = require("mongoose");

const HauptCategory = new mongoose.Schema({
  categoryNameBasic: {
    type: String,
    trim: true,
  },
});

const category = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HauptCategory-data",
    required: true,
  },
  subCategoryNameBasic: {
    type: String,
    trim: true,
  },
});

const productadvertising = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductMerchants-data",
  },
  productName: {
    type: String,
    trim: true,
    require: true,
  },
  advertisingStartDate: Date,
  advertisingEndDate: Date,
  priceBeforeDiscount: Number,
  priceAfterDiscount: Number,
});

const productMerchants = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category-data",
    required: true,
  },

  productName: {
    type: String,
    trim: true,
    require: true,
  },
  productDescription: {
    type: String,
    trim: true,
  },
  productBarcode: {
    type: Number,
    trim: true,
    unique: [true, "This Barcode is already exists"],
  },
  productImages: String,
});
const category_data = mongoose.model("Category-data", category);
const productadvertising_data = mongoose.model(
  "Productadvertising-data",
  productadvertising
);
const HauptCategory_data = mongoose.model("HauptCategory-data", HauptCategory);

const productMerchants_data = mongoose.model(
  "ProductMerchants-data",
  productMerchants
);
module.exports = [
  productadvertising_data,
  productMerchants_data,
  category_data,
  HauptCategory_data,
];
