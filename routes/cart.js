const router = require("express").Router();
const Carts = require("../model/cart");
const verify = require("./verifyToken");

//CREATE NEW CARTS
router.post("/", verify, async (req, res) => {
  const cart = new Carts(req.body);
  try {
    const savedFood = await cart.save();
    res.send(savedFood);
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET ALL CARTS
router.get("", async (req, res) => {
  try {
    const cart = await Carts.find();
    if (!cart) throw Error("There are not any data in cart");
    res.json(cart);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//GET AN CARTS
router.get("/:id", async (req, res) => {
  try {
    const cart = await Carts.findById(req.params.id);
    if (!cart) throw Error("There are not any data in cart");
    res.json(cart);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//UPDATE AN CARTS
router.patch("/:id", async (req, res) => {
  try {
    const cart = await Carts.findByIdAndUpdate(req.params.id, req.body);
    if (!cart) throw Error("There is no cart with that id!");
    const updateCart = await Carts.findById(req.params.id);
    if (!updateCart) throw Error("Something goes wrong!");
    res.json(updateCart);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//DELETE AN CARTS
router.delete("/:id", async (req, res) => {
  try {
    const cart = await Carts.findByIdAndDelete(req.params.id);
    if (!cart) throw Error("There is no cart with that id!");
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
