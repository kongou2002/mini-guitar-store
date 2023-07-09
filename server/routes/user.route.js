const express = require("express");
const auth = require("../middleware/auth");
const usersController = require("../controllers/user.controller");
const router = express.Router();

router
  .route("/profile")
  .get(auth("readOwn", "profile"), usersController.profile)
  .patch(auth("updateOwn", "profile"), usersController.updateProfile);
router.get("/", usersController.getAllUser);
router.get("/not-user", usersController.getAllAccountExceptUser);
router.patch(
  "/email",
  auth("updateOwn", "profile"),
  usersController.updateUserEmail
);
router.post("/create-by-admin", usersController.createUserByAdmin);
router.patch("/modify-by-admin", usersController.modifyUserByAdmin);
router.delete("/delete-by-admin", usersController.deleteUserByAdmin);

router.get("/verify", usersController.verifyAccount);
module.exports = router;
