const express = require("express");
const { defaultError } = require("../../errors");
const router = express.Router();
const db = require("../../models");
const jwt = require("jsonwebtoken");

router.get("/users", async function (req, res) {
  try {
    // const {params: { auth }} = req;
    const users = await db.User.findAll();
     const token = jwt.sign({ foo: "bar" }, "shhhhh");
    console.log("Массив юзеров:  ", users);
    return res.send(users);
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;
