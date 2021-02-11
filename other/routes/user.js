const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const userController = require("../controllers/userController");

router.get("/:id", catchErrors(userController.login));

module.exports = router;
