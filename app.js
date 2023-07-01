global.config = require("./config-prod.json");
const cors = require("cors"); 
const express = require("express");
const fileUpload = require("express-fileupload");
const productsController = require("./controllers-layer/products-controller");
const PORT =process.env.PORT || 3000;


const server = express();
server.use(cors());
server.use(express.json());
server.use(fileUpload());
server.use("/api/products", productsController);




server.use("*", (request, response) =>
  response.status(404).send("Route not found.")
);


const listener = server.listen(PORT, () =>
  console.log(`Listening on port ${PORT}`)
);
