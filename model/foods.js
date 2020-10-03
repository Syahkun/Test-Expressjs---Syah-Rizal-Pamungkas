const mongoose = require("mongoose");

const foodsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  image: {
    type: String,
    max: 1024,
    min: 6,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  qty: {
    type: Number,
    required: true,
    default: 0,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Foods", foodsSchema);
