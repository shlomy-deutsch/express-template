const path = require("path");
const dal = require("../data-access-layer/dal-sql");

async function getAllProductsAsync() {
  const sql = "SELECT * FROM products;";
  const products = await dal.executeAsync(sql);
  return products;
}

async function addProductAsync(product) {
 const sql = `INSERT INTO products (Brand, Variety, Year, Investor, Date_purchase, Date_selling, Position, Purchase_price, Selling_price, Seller_name, Buyer_name, Profit, Count, Value, Over_all_purchase_price, Over_all_value)
VALUES ('${product.Brand}', '${product.Variety}', ${product.Year}, '${product.Investor}', '${product.Date_purchase}', '${product.Date_selling}', '${product.Position}', ${product.Purchase_price}, ${product.Selling_price}, '${product.Seller_name}', '${product.Buyer_name}', ${product.Profit}, ${product.Count}, ${product.Value}, ${product.Over_all_purchase_price}, ${product.Over_all_value})`;
const addedProduct = await dal.executeAsync(sql);
  product.id = addedProduct.insertId;
  return product;
}

async function updateProductAsync(product) {
  const sql = `UPDATE products SET Brand = '${product.Brand}', Variety = '${product.Variety}',
  Year = ${product.Year}, Investor = '${product.Investor}', Date_purchase = '${product.Date_purchase}', 
  Date_selling = '${product.Date_selling}',  Position = '${product.Position}', Purchase_price = ${product.Purchase_price}, 
  Selling_price = ${product.Selling_price}, Seller_name = '${product.Seller_name}', Buyer_name = '${product.Buyer_name}', 
  Profit = ${product.Profit}, Count	 = ${product.Count}, Value = ${product.Value}, 
  Over_all_purchase_price = ${product.Over_all_purchase_price}, Over_all_value = ${product.Over_all_value} WHERE ID = ${product.id}`;
  const addedProduct = await dal.executeAsync(sql);

  return product;
}

async function deleteAllProductAsync(id) {
  const sql = `DELETE FROM products WHERE ID = ${id}`;
  const info = await dal.executeAsync(sql);
  return info.affectedRows === 0 ? false : true;
}

async function searchProductsAsync(param){
  const sql = `SELECT * FROM products WHERE Brand LIKE '%${param}%';`;
  const products = await dal.executeAsync(sql);
  return products;
}
async function searchVarietyProductsAsync(param){
  const sql = `SELECT * FROM products WHERE Variety LIKE '%${param}%';`;

  const products = await dal.executeAsync(sql);
  return products;
}

module.exports = {
  getAllProductsAsync,
  addProductAsync,
  updateProductAsync,
  deleteAllProductAsync,
  searchProductsAsync,
  searchVarietyProductsAsync
};
