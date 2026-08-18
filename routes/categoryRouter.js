const { Router } = require("express");
const categoryController = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/", categoryController.category_list);

categoryRouter.get("/create", categoryController.category_create_get);
categoryRouter.post("/create", categoryController.category_create_post);

categoryRouter.get("/:id", categoryController.category_detail);

categoryRouter.get("/:id/update", categoryController.category_update_get);
categoryRouter.post("/:id/update", categoryController.category_update_post);

categoryRouter.get("/:id/delete", categoryController.category_delete_get);
categoryRouter.post("/:id/delete", categoryController.category_delete_post);

module.exports = categoryRouter;
