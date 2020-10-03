const router = require("express").Router();
const Foods = require("../model/foods");

//CREATE NEW FOODS
router.post("/", async (req, res) => {
  const food = new Foods(req.body);
  try {
    const savedFood = await food.save();
    res.send(savedFood);
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET ALL FOODS
router.get("", async (req, res) => {
  try {
    const food = await Foods.find();
    if (!food) throw Error("There are not any data in food");
    res.json(food);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//GET AN FOODS
router.get("/:id", async (req, res) => {
  try {
    const food = await Foods.findById(req.params.id);
    if (!food) throw Error("There are not any data in food");
    res.json(food);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//UPDATE AN FOODS
router.patch("/:id", async (req, res) => {
  try {
    const food = await Foods.findByIdAndUpdate(req.params.id, req.body);
    if (!food) throw Error("There is no food with that id!");
    const updateFood = await Foods.findById(req.params.id);
    if (!updateFood) throw Error("Something goes wrong!");
    res.json(updateFood);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//DELETE AN FOODS
router.delete("/:id", async (req, res) => {
  try {
    const food = await Foods.findByIdAndDelete(req.params.id);
    if (!food) throw Error("There is no food with that id!");
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
