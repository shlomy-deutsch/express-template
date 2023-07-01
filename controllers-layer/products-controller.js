const fs = require("fs");
const path = require("path");
const express = require("express");
const logic = require("../business-logic-layer/products-logic");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const products = await logic.getAllProductsAsync();
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.get("/brand/:param", async (request, response) => {
  try {
    const param = request.params.param;

    const products = await logic.searchProductsAsync(param);
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});
router.get("/variety/:param", async (request, response) => {
  try {
    const param = request.params.param;

    const products = await logic.searchVarietyProductsAsync(param);
    response.json(products);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/", async (request, response) => {

  try {
    const product = request.body;
    const addedProduct = await logic.addProductAsync(product);
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
    
    const updateProduct = await logic.updateProductAsync(product);

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
