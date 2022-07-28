const express = require("express");

const uuid = require("uuid");
const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models")

router.post("/todo", async function (req, res) {
  try {
    const { body: { name } } = req;
    const regExp = /[a-zA-Z0-9]/g;
    if (!name || !regExp.test(name)) {
      throw defaultError(
        422,
        "Invalid fields in request! Try to rewrite your task"
      );
    }
    if (name.length > 250) {
      throw defaultError(
        500,
        "Too many symbols. Max is 250"
      );
    }

    const sameTask = await db.Task.findOne({
      where: {
        name: name
      }
    });
    if (sameTask) {
      throw defaultError(400, "Task not created! Maybe the same task already exists");
    }

    const createdTask = await db.Task.create({
      uuid: uuid.v1(),
      name: name,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()  //////////////////////////
    })
    res.send(createdTask);
  } catch (error) {
    return res.status(error.status||500).send(error);
  }
});

module.exports = router;