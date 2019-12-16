const express = require("express");
const user = require("../Routes/user");

const router = express.Router();

router.use("/", user);

module.exports = router;
