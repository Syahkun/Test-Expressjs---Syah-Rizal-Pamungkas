const router = require("express").Router();
const PackageDetails = require("../model/packageDetail");
const Packages = require("../model/package");
const Foods = require("../model/foods");

//CREATE NEW CARD DETAIL
router.post("/", async (req, res) => {
  const packageDetail = new PackageDetails(req.body);
  try {
    const savedPackageDetail = await packageDetail.save();
    res.send(savedPackageDetail);
    const package = await Packages.findById(req.body.package_id);
    if (!package) throw Error("Something goes wrong!");
    // console.log(package)
    const food = await Foods.findById(req.body.food_id);
    if (!food) throw Error("Something goes wrong!");
    package.price += food.price;
    await package.save();
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET ALL CARD DETAIL
router.get("", async (req, res) => {
  try {
    const packageDetail = await PackageDetails.find();
    if (!packageDetail) throw Error("There are not any data in packageDetail");
    res.json(packageDetail);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//GET AN CARD DETAIL
router.get("/:id", async (req, res) => {
  try {
    const packageDetail = await PackageDetails.findById(req.params.id);
    console.log(packageDetail);
    if (!packageDetail) throw Error("There are not any data in packageDetail");
    res.json(packageDetail);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//UPDATE AN CARD DETAIL
router.patch("/:id", async (req, res) => {
  try {
    const packageDetail = await PackageDetails.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!packageDetail) throw Error("There is no packageDetail with that id!");
    const updatePackageDetail = await PackageDetails.findById(req.params.id);
    if (!updatePackageDetail) throw Error("Something goes wrong!");
    res.json(updatePackageDetail);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//DELETE AN CARD DETAIL
router.delete("/:id", async (req, res) => {
  //   console.log("tsttss");
  try {
    console.log("asa");
    const packageDetail = await PackageDetails.findById(req.params.id);
    console.log(packageDetail);
    console.log(req.params.id);
    const package = await Packages.findById(packageDetail.package_id);

    if (!package) throw Error("Something goes wrong!");
    // console.log(package)
    const food = await Foods.findById(packageDetail.food_id);
    if (!food) throw Error("Something goes wrong!");
    package.price -= food.price;
    await package.save();
    const packageDetailDel = await PackageDetails.findByIdAndDelete(
      req.params.id
    );
    if (!packageDetailDel)
      throw Error("There is no packageDetail with that id!");
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
