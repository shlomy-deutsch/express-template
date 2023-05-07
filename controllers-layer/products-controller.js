const fs = require("fs");
const path = require("path");
const express = require("express");
const logic = require("../business-logic-layer/products-logic");
const router = express.Router();

router.get("/images/:name", (request, response) => {
  try {
    const name = request.params.name;
    let absolutePath = path.join(__dirname, "..", "images", "products", name);
    if (!fs.existsSync(absolutePath)) {
      absolutePath = path.join(__dirname, "..", "images", "not-found.png");
    }
    response.sendFile(absolutePath);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
//////////////////////////////////////////////////////////////////
router.get("/", async (request, response) => {
  try {
    const products = await logic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/", async (request, response) => {
  try {
    const product = request.body;

    const image =
      request.files && request.files.image ? request.files.image : null;
    if (!image) return response.status(400).send("Missing image.");
    const addedProduct = await logic.addProductAsync(product, image);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const product = request.body;
    product.id = id;
    const image =
      request.files && request.files.image ? request.files.image : null;

    const updateProduct = await logic.updateProductAsync(product, image);

    response.status(200).json(updateProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const id = +request.params.id;
    const deleted = await logic.deleteAllProductAsync(id);
    if (!deleted)
      return response.status(400).json({ message: "Could not delete row." });
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
