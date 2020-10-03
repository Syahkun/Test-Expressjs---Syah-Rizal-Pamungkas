const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("./validation");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  //VALIDATE THE DATA
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  //CHECKING IF THE USER IS ALREADY IN THE DATABASE
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ Message: "Email already exists" });
  //HASH THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  //CREATE NEW USER
  req.body.password = hashPassword;
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//GET ALL USER
router.get("", async (req, res) => {
  try {
    const user = await User.find();
    if (!user) throw Error("There are not any data in user");
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//GET AN USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error("There are not any data in user");
    res.json(user);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//UPDATE AN USER
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) throw Error("There is no user with that id!");
    const updateUser = await User.findById(req.params.id);
    if (!updateUser) throw Error("Something goes wrong!");
    res.json(updateUser);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//DELETE AN USER
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw Error("There is no user with that id!");
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //VALIDATE BEFORE LOGIN
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  //CHECKING IF THE USER IS ALREADY IN THE DATABASE
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");
  //PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is wrong");
  //CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send({ token: token });
});

module.exports = router;
