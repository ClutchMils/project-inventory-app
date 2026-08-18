const pool = require("./pool");

// Get all categories
async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY name ASC;");
  return rows;
}

// Get single category by ID
async function getCategoryById(id) {
  const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1;", [id]);
  return rows[0];
}

// Get all items belonging to a specific category
async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query("SELECT * FROM items WHERE category_id = $1 ORDER BY name ASC;", [categoryId]);
  return rows;
}

// Get all items with category names included
async function getAllItems() {
  const query = `
    SELECT items.*, categories.name AS category_name 
    FROM items 
    JOIN categories ON items.category_id = categories.id 
    ORDER BY items.name ASC;
  `;
  const { rows } = await pool.query(query);
  return rows;
}

// Get single item by ID with category info
async function getItemById(id) {
  const query = `
    SELECT items.*, categories.name AS category_name 
    FROM items 
    JOIN categories ON items.category_id = categories.id 
    WHERE items.id = $1;
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

// Existing READ queries above...

// --- CATEGORIES ---
async function insertCategory(name, description) {
  await pool.query(
    "INSERT INTO categories (name, description) VALUES ($1, $2);",
    [name, description],
  );
}

async function updateCategory(id, name, description) {
  await pool.query(
    "UPDATE categories SET name = $1, description = $2 WHERE id = $3;",
    [name, description, id],
  );
}

// --- ITEMS ---
async function insertItem(
  name,
  description,
  price,
  number_in_stock,
  category_id,
) {
  await pool.query(
    `INSERT INTO items (name, description, price, number_in_stock, category_id)
     VALUES ($1, $2, $3, $4, $5);`,
    [name, description, price, number_in_stock, category_id],
  );
}

async function updateItem(
  id,
  name,
  description,
  price,
  number_in_stock,
  category_id,
) {
  await pool.query(
    `UPDATE items 
     SET name = $1, description = $2, price = $3, number_in_stock = $4, category_id = $5
     WHERE id = $6;`,
    [name, description, price, number_in_stock, category_id, id],
  );
}

// Delete an item directly
async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1;", [id]);
}

// Delete a category
async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1;", [id]);
}

module.exports = {
  getAllCategories,
  getCategoryById,
  getItemsByCategoryId,
  getAllItems,
  getItemById,
  insertCategory,
  updateCategory,
  insertItem,
  updateItem,
  deleteItem,
  deleteCategory,
};