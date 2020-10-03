const mongoose = require("mongoose");

const packageDetailSchema = new mongoose.Schema({
  food_id: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  package_id: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PackageDetails", packageDetailSchema);
