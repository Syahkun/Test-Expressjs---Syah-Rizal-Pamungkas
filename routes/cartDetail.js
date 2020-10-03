const router = require("express").Router();
const CartDetails = require("../model/cartDetail");
const Carts = require("../model/cart");
const Foods = require("../model/foods");
const cart = require("../model/cart");

//CREATE NEW CARTDETAILS
router.post("/", async (req, res) => {
  const cartDetail = new CartDetails(req.body);
  console.log("test");
  try {
    //CHECK QTY OF FOODS
    const food = await Foods.findById(req.body.food_id);
    console.log(food);
    if (food.qty == 0)
      return res.status(200).send({ status: "This food is sold out!" });
    //IF QTY IS NOT ZERO AND THEN UPDATE QTY OF FOOD
    food.qty = food.qty - req.body.qty;
    await food.save();
    console.log(food);
    //UPDATE AND SHOW ORDER
    cartDetail.price = food.price * cartDetail.qty;
    const savedCartDetail = await cartDetail.save();
    res.send(savedCartDetail);
    //FINISH AND UPDATE CART
    const cart = await Carts.findById(req.body.cart_id);
    cart.total_qty += savedCartDetail.qty;
    cart.total_price += savedCartDetail.price;
    await cart.save();
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET ALL CARTDETAILS
router.get("", async (req, res) => {
  try {
    const cartDetail = await CartDetails.find();
    if (!cartDetail) throw Error("There are not any data in cartDetail");
    res.json(cartDetail);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//GET AN CARTDETAILS
router.get("/:id", async (req, res) => {
  try {
    const cartDetail = await CartDetails.findById(req.params.id);
    if (!cartDetail) throw Error("There are not any data in cartDetail");
    res.json(cartDetail);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//UPDATE AN CARTDETAILS
router.patch("/:id", async (req, res) => {
  try {
    const cartDetail = await CartDetails.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!cartDetail) throw Error("There is no cartDetail with that id!");
    const updateCartDetail = await CartDetails.findById(req.params.id);
    if (!updateCartDetail) throw Error("Something goes wrong!");
    res.json(updateCartDetail);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//DELETE AN CARTDETAILS
router.delete("/:id", async (req, res) => {
  try {
    const cartDetail = await CartDetails.findByIdAndDelete(req.params.id);
    if (!cartDetail) throw Error("There is no cart with that id!");
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
