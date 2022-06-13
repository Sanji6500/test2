const mongoose = require("mongoose");
const Tags = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category-data" },
  tagsName: {
    type: String,
    trim: true,
    require: true,
  },
});

const Tags_data = mongoose.model("Tags-data", Tags);
module.exports = [Tags_data];
