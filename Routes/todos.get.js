const c = require("config");
const express = require("express");
const fs = require("fs").promises;
const router = express.Router();

router.get("/todos", function (req, res) {
  fs.readFile("data.json").then((data) => {
    let tasks = JSON.parse(data);

    if (req.query.order === "asc") {
      tasks = tasks.sort((prev, next) => {
        return new Date(prev.createdAT) - new Date(next.createdAT);
      });
    }
    if (req.query.order === "desc") {
      tasks = tasks.sort((prev, next) => {
        return new Date(next.createdAT) - new Date(prev.createdAT);
      });
    }
    if (req.query.filterBy === "done") {
      tasks = tasks.filter((task) => task.done === true);
    }
    if (req.query.filterBy === "undone") {
      tasks = tasks.filter((task) => task.done === false);
    }
    if (req.query.pp && req.query.page) {
      const lastTaskIndex = req.query.page *  req.query.pp;
      const firstTaskIndex = lastTaskIndex - req.query.pp;
      tasks = tasks.slice(firstTaskIndex, lastTaskIndex);
      console.log("Tasks per page: ", req.query.pp);
      console.log("Current page: ", req.query.page);
    }

    res.send({ count: tasks.length, tasks });
  });
});

module.exports = router;
