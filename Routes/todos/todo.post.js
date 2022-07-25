const express = require("express");
const fs = require("fs").promises;

const uuid = require("uuid");
const router = express.Router();
const {defaultError} = require("../../errors")

router.post("/todo", function (req, res, next) {
  try {
    const regExp = /[a-zA-Z0-9]/g;
    if (!req.body.name ||!regExp.test(req.body.name)) {
      throw defaultError(422, "Invalid fields in request! Try to rewrite your task" )
    }

    fs.readFile("data.json").then((data) => {
      const tasks = JSON.parse(data);
      const sameTask = tasks.find((item) => item.name === req.body.name);
      try {
        if(sameTask) {
        throw defaultError(400, "Task not created! Maybe the same task already exists" )
      }} catch (error) {
        return res.send(error);
      }
      const createdTask = {
        name: req.body.name,
        uuid: uuid.v1(),
        done: false,
        createdAt: new Date(),
      };
      tasks.push(createdTask);
      fs.writeFile("data.json", JSON.stringify(tasks));
      res.send(createdTask);
    });
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
