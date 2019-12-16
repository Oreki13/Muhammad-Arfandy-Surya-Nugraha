const express = require("express");
const {
  getAllUser,
  addUser,
  updateUser,
  deleteUser,
  login,
  register,
  verify
} = require("../Controllers/user");
const router = express.Router();
const { accesstoken, authInfo } = require("../Helpers/auth");

router
  .post("/register", register)
  .post("/login", login)
  .get("/auth", verify)
  .get("/users", authInfo, accesstoken, getAllUser)
  .post("/users", authInfo, accesstoken, addUser)
  .patch("/users/:id", authInfo, accesstoken, updateUser)
  .delete("/users/:id", authInfo, accesstoken, deleteUser);

module.exports = router;
