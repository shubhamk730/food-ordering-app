const express = require("express");
const app = express();
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyparser.json());
app.get("/", (req, res) => {
  return res.json({ message: "Hello world" });
});

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status);
  return res.json({
    message: message,
    data: data,
  });
});

mongoose
  .connect(`${MONGO_URI}`)
  .then((res) => {
    app.listen(PORT, () => {
      console.log("app started");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database");
    console.log(err);
  });
