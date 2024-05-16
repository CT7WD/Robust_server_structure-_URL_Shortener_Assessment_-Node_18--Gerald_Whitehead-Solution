const router = require("express").Router({ mergeParams: true });
const controller = require("./urls.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router
    .route("/:urlId")
    .get(controller.read)
    .put(controller.update)
    .all(methodNotAllowed);


router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

//.put(controller.update)
//     .delete(controller.delete)
module.exports = router;