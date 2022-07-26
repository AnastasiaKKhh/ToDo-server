const c = require("config");
const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const { defaultError } = require("../../errors");

router.get("/todos", async function (req, res) {
  try {
    const data = await fs.readFile("data.json");
    let tasks = JSON.parse(data);
    let todoCounter = tasks.length;

    if (req.query.order === "asc") {
      tasks = tasks.sort((prev, next) => {
        return new Date(prev.createdAt) - new Date(next.createdAt);
      });
    }
    if (req.query.order === "desc") {
      tasks = tasks.sort((prev, next) => {
        return new Date(next.createdAt) - new Date(prev.createdAt);
      });
    }
    if (req.query.filterBy === "done") {
      tasks = tasks.filter((task) => task.done);
      todoCounter = tasks.length;
    }
    if (req.query.filterBy === "undone") {
      tasks = tasks.filter((task) => !task.done);
      todoCounter = tasks.length;
    }
    if (req.query.pp && req.query.page) {
      const lastTaskIndex = req.query.page * req.query.pp;
      const firstTaskIndex = lastTaskIndex - req.query.pp;
      tasks = tasks.slice(firstTaskIndex, lastTaskIndex);
    }

    res.send({ count: todoCounter, tasks });
  } catch (error) {
    return res.status(error.status).send(error);
  }
});

module.exports = router;
