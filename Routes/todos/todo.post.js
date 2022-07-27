const express = require("express");
const fs = require("fs").promises;

const uuid = require("uuid");
const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models")

router.post("/todo", async function (req, res) {
   try {
    const regExp = /[a-zA-Z0-9]/g;
    if (!req.body.name || !regExp.test(req.body.name)) {
      throw defaultError(
        422,
        "Invalid fields in request! Try to rewrite your task"
      );
    }
    if (req.body.name.length > 250) {
      throw defaultError(
        500,
        "Too many symbols. Max is 250"
      );
    }

    const tasks = await db.Task.findAll();
    const sameTask = tasks.find((item) => item.name === req.body.name);
    if (sameTask) {
      throw defaultError(400, "Task not created! Maybe the same task already exists");
    }

    const createdTask = await db.Task.create({
      uuid: uuid.v1(),
      name:  req.body.name,
      done: false,
      createdAt:new Date(),
      updatedAt:new Date()
    })
    res.send(createdTask);
  } catch (error) {
    return res.status(error.status).send(error);
  }
});

module.exports = router;
