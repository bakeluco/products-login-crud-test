const express = require("express");

const productsControllers = require("../controllers/products-controllers.js");

const router = express.Router();

router.get("/", productsControllers.read);
router.post("/create", productsControllers.create);
router.patch("/update", productsControllers.update);
router.delete("/delete", productsControllers.destroy);

module.exports = router;
