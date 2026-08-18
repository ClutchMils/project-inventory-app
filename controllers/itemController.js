const db = require("../db/queries.js");

// Display list of all Items
exports.item_list = async (req, res, next) => {
  try {
    const items = await db.getAllItems();
    res.render("item_list", { title: "All Grocery Items", items });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific Item
exports.item_detail = async (req, res, next) => {
  try {
    const item = await db.getItemById(req.params.id);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("item_detail", { title: item.name, item });
  } catch (err) {
    next(err);
  }
};

// GET Create Item Form
exports.item_create_get = async (req, res, next) => {
  try {
    const categories = await db.getAllCategories();
    res.render("item_form", { title: "Create Item", item: null, categories });
  } catch (err) {
    next(err);
  }
};

// POST Create Item
exports.item_create_post = async (req, res, next) => {
  try {
    const { name, description, price, number_in_stock, category_id } = req.body;
    await db.insertItem(name, description, price, number_in_stock, category_id);
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
};

// GET Update Item Form
exports.item_update_get = async (req, res, next) => {
  try {
    const item = await db.getItemById(req.params.id);
    const categories = await db.getAllCategories();
    if (!item) return res.status(404).send("Item not found");

    res.render("item_form", { title: "Update Item", item, categories });
  } catch (err) {
    next(err);
  }
};

// POST Update Item
exports.item_update_post = async (req, res, next) => {
  try {
    const { name, description, price, number_in_stock, category_id } = req.body;
    await db.updateItem(
      req.params.id,
      name,
      description,
      price,
      number_in_stock,
      category_id,
    );
    res.redirect(`/items/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

// GET confirmation page for deleting an item
exports.item_delete_get = async (req, res, next) => {
  try {
    const item = await db.getItemById(req.params.id);
    if (!item) return res.status(404).send("Item not found");

    res.render("item_delete", { title: "Delete Item", item });
  } catch (err) {
    next(err);
  }
};

// POST delete item
exports.item_delete_post = async (req, res, next) => {
  try {
    await db.deleteItem(req.params.id);
    res.redirect("/items");
  } catch (err) {
    next(err);
  }
};
