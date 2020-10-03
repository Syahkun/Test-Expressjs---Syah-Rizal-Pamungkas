const mongoose = require("mongoose");

const cartDetailSchema = new mongoose.Schema({
  cart_id: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  food_id: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("CartDetail", cartDetailSchema);
