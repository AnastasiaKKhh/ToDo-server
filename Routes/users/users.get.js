const express = require("express");
const { defaultError } = require("../../errors");
const router = express.Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");

router.get("/users", async function (req, res) {
  try {
    const users = await db.User.findAll();
    return res.send(users);
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;
