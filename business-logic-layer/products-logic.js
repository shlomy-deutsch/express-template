const path = require("path");
const dal = require("../data-access-layer/dal-sql");

async function getAllProductsAsync() {
  const sql = "SELECT ID as id, name, price, image FROM products;";
  console.log(sql);
  const products = await dal.executeAsync(sql);
  return products;
}


async function addProductAsync(product, image) {
  const sql = `INSERT INTO products(name, price)
                VALUES('${product.name}', ${product.price})`;
  const addedProduct = await dal.executeAsync(sql);
  product.id = addedProduct.insertId;

  const extension = image.name.substr(image.name.lastIndexOf("."));
  const fileName = `${product.id}${extension}`;
  product.imageName = fileName;
  const absolutePath = path.join(
    __dirname,
    "..",
    "images",
    "products",
    fileName
  );
  await image.mv(absolutePath);

  const updateSql = `UPDATE products SET image = '${fileName}' WHERE ID = ${product.id}`;
  await dal.executeAsync(updateSql);
  return product;
}




async function updateProductAsync(product, image) {
  const sql = `UPDATE products SET name = '${product.name}', price = ${product.price} WHERE ID = ${product.id}`;
  const addedProduct = await dal.executeAsync(sql);
  if (image) {

    const extension = image.name.substr(image.name.lastIndexOf("."));

    const fileName = `${image.name}${extension}`;

    product.imageName = fileName;
    const absolutePath = path.join(
      __dirname,
      "..",
      "images",
      "products",
      fileName
    );
    await image.mv(absolutePath);

    const updateSql = `UPDATE products SET image = '${fileName}' WHERE ID = ${product.id}`;
    await dal.executeAsync(updateSql);
  }
  return product;
}


async function deleteAllProductAsync(id) {
  const sql = `DELETE FROM products WHERE ID = ${id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? false : true;
}


module.exports = {
  getAllProductsAsync,
  addProductAsync,
  updateProductAsync,
  deleteAllProductAsync,
};