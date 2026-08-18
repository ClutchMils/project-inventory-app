const db = require("../db/queries.js");
// Display list of all Categories
exports.category_list = async (req, res, next) => {
  try {
    const categories = await db.getAllCategories();
    res.render("category_list", { title: "Grocery Categories", categories });
  } catch (err) {
    next(err);
  }
};

// Display detail page for a specific Category
exports.category_detail = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await db.getCategoryById(categoryId);
    const categoryItems = await db.getItemsByCategoryId(categoryId);

    if (!category) {
      return res.status(404).send("Category not found");
    }

    res.render("category_detail", {
      title: category.name,
      category,
      items: categoryItems,
    });
  } catch (err) {
    next(err);
  }
};

// GET Create Category Form
exports.category_create_get = (req, res) => {
  res.render("category_form", { title: "Create Category", category: null });
};

// POST Create Category
exports.category_create_post = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    await db.insertCategory(name, description);
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
};

// GET Update Category Form
exports.category_update_get = async (req, res, next) => {
  try {
    const category = await db.getCategoryById(req.params.id);
    if (!category) return res.status(404).send("Category not found");

    res.render("category_form", { title: "Update Category", category });
  } catch (err) {
    next(err);
  }
};

// POST Update Category
exports.category_update_post = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    await db.updateCategory(req.params.id, name, description);
    res.redirect(`/categories/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

// GET category delete page
exports.category_delete_get = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await db.getCategoryById(categoryId);
    const categoryItems = await db.getItemsByCategoryId(categoryId);

    if (!category) return res.status(404).send("Category not found");

    res.render("category_delete", {
      title: "Delete Category",
      category,
      category_items: categoryItems,
    });
  } catch (err) {
    next(err);
  }
};

// POST category delete
exports.category_delete_post = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const categoryItems = await db.getItemsByCategoryId(categoryId);

    // Safety check: if items still exist, prevent deletion
    if (categoryItems.length > 0) {
      const category = await db.getCategoryById(categoryId);
      return res.render("category_delete", {
        title: "Delete Category",
        category,
        category_items: categoryItems,
      });
    }

    await db.deleteCategory(categoryId);
    res.redirect("/categories");
  } catch (err) {
    next(err);
  }
};
