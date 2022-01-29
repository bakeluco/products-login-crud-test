//Top Level Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Low Level Imports
const usersRoutes = require("./routes/users-routes.js");
const productsRoutes = require("./routes/products-routes.js");

//Init
const app = express();

//Settings
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

//Middlewares
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);

//Global Vars

//Routes

//Static Files
const MONGODB_CONNECTION_STIRNG = ""


//App Listening...
mongoose
  .connect(MONGODB_CONNECTION_STIRNG)
  .then(() => app.listen(
    app.get("port"), () => {
      console.log("Server on port", `http://localhost:${app.get("port")}`);
    }))
  .catch(e => console.log(e));

