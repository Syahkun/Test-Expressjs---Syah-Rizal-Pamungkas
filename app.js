const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");

//IMPORT ROUTES
const authRoute = require("./routes/auth");
const foodRoute = require("./routes/foods");
const cartRoute = require("./routes/cart");
const cartDetailRoute = require("./routes/cartDetail");
const packageRoute = require("./routes/package");
const packageDetailRoute = require("./routes/packageDetail");

dotenv.config();

//CONNECT TO MONGO
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => console.log("Connected to Mongo")
);

mongoose.set("useFindAndModify", false);

//MIDDLEWARE
app.use(express.json());
app.use(bodyParser.json());

//ROUTE MIDDLEWARES
app.use("/api/user", authRoute);
app.use("/api/foods", foodRoute);
app.use("/api/carts", cartRoute);
app.use("/api/cartDetails", cartDetailRoute);
app.use("/api/packages", packageRoute);
app.use("/api/packageDetails", packageDetailRoute);

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`);
});
