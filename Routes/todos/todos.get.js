const c = require("config");
const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const {FILTER_BY} = require("../../constants");
const {TASKS_ORDER} = require ('../../constants')

router.get("/todos", async function (req, res) {
  try {
    const data = await fs.readFile("data.json");
    let tasks = JSON.parse(data);
    let todoCount = tasks.length;

    if (req.query.order === TASKS_ORDER.ASC) {
      tasks = tasks.sort((prev, next) => {
        return new Date(prev.createdAt) - new Date(next.createdAt);
      });
    }
    if (req.query.order === TASKS_ORDER.DESC) {
      tasks = tasks.sort((prev, next) => {
        return new Date(next.createdAt) - new Date(prev.createdAt);
      });
    }
    if (req.query.filterBy === FILTER_BY.DONE) {
      tasks = tasks.filter((task) => task.done);
      todoCount = tasks.length;
    }
    if (req.query.filterBy === FILTER_BY.UNDONE) {
      tasks = tasks.filter((task) => !task.done);
      todoCount = tasks.length;
    }
    if (req.query.pp && req.query.page) {
      const lastTaskIndex = req.query.page * req.query.pp;
      const firstTaskIndex = lastTaskIndex - req.query.pp;
      tasks = tasks.slice(firstTaskIndex, lastTaskIndex);
    }

    res.send({ count: todoCount, tasks });
  } catch (error) {
    return res.status(error.status).send(error);
  }
});

module.exports = router;
