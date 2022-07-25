const express = require("express");
const fs = require("fs").promises;
const router = express.Router();


router.get("/todos", function (req, res) {
  fs.readFile("data.json")
    .then((data) => {
      let tasks = JSON.parse(data);
      if (req.query.order === 'asc') {
        tasks = tasks.sort((prev, next) => {
          return new Date(prev.createdAT) - new Date(next.createdAT);
        })
      }
      if (req.query.order === 'desc') {
        tasks = tasks.sort((prev, next) => {

          return new Date(next.createdAT) - new Date(prev.createdAT);
        })

      }
      if (req.query.filterBy) {
        if (req.query.filterBy === 'done') {
          tasks = tasks.filter(task => task.done === true)
        } else { tasks = tasks.filter(task => !task.done === true) }
      }

      res.send({ count: tasks.length, tasks });
    })
});

module.exports = router