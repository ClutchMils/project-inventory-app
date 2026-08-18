const { Router } = require("express");
const itemController = require("../controllers/itemController");
const itemRouter = Router();

itemRouter.get("/", itemController.item_list);

itemRouter.get("/create", itemController.item_create_get);
itemRouter.post("/create", itemController.item_create_post);

itemRouter.get("/:id", itemController.item_detail);

itemRouter.get("/:id/update", itemController.item_update_get);
itemRouter.post("/:id/update", itemController.item_update_post);

itemRouter.get("/:id/delete", itemController.item_delete_get);
itemRouter.post("/:id/delete", itemController.item_delete_post);

module.exports = itemRouter;
