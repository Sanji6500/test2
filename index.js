require("dotenv").config({ path: "./config.env" });
const express = require("express");

const optionsRoute = require("./routes/Option");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use("/Images", express.static("Images"));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database is online"))
  .catch((err) => console.log(err));

app.use("/admin_register", require("./routes/users_route"));
app.use("/anas", optionsRoute);
app.use("/mechents_register", require("./routes/mechant_route"));

app.use("/merchants", require("./routes/Products_mechents_route"));
app.use("/customer", require("./routes/Customer_route"));
app.use("/tags", require("./routes/Tags_route"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else
  app.get("/", (req, res) => {
    res.send("api is running");
  });

app.listen(6500, () => {
  console.log("Server is online");
});
