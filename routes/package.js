const router = require("express").Router();
const Packages = require("../model/package");
const PackageDetails = require("../model/packageDetail");
const Foods = require("../model/foods");
const query = PackageDetails.find();

//CREATE NEW PACKAGES
router.post("", async (req, res) => {
  const package = new Packages(req.body);
  try {
    const savedPackage = await package.save();
    res.send(savedPackage);
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET ALL PACKAGES
router.get("", async (req, res) => {
  try {
    const package = await Packages.find();
    if (!package) throw Error("There are not any data in package");
    res.json(package);
    console.log(package);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//GET AN PACKAGES
router.get("/:id", async (req, res) => {
  try {
    let package = await Packages.findById(req.params.id).lean();
    const packageDetail = await PackageDetails.where({
      package_id: req.params.id,
    }).lean();
    if (!packageDetail) throw Error("Something goes wrong");
    if (!package) throw Error("There are not any data in package");
    package["list_of_foods"] = packageDetail;
    // console.log(packageDetail);
    for (let i = 0; i < packageDetail.length; i++) {
      const food = await Foods.findById(packageDetail[i].food_id);
      package["list_of_foods"][i]["food"] = food;
    }
    res.json(package);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//UPDATE AN PACKAGES
router.patch("/:id", async (req, res) => {
  try {
    const package = await Packages.findByIdAndUpdate(req.params.id, req.body);
    if (!package) throw Error("There is no package with that id!");
    const updatePackage = await Packages.findById(req.params.id);
    if (!updatePackage) throw Error("Something goes wrong!");
    res.json(updatePackage);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//DELETE AN PACKAGES
router.delete("/:id", async (req, res) => {
  try {
    const package = await Packages.findByIdAndDelete(req.params.id);
    if (!package) throw Error("There is no package with that id!");
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

module.exports = router;
