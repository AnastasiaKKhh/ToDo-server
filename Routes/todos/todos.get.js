const c = require("config");
const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const {FILTER_BY} = require("../../constants");
const {TASKS_ORDER} = require ('../../constants');
const db = require("../../models")

router.get("/todos", async function (req, res) {
  try {
  let tasks;
   if (req.query.filterBy) {
    tasks = await db.Task.findAll({
      where: {
        done: req.query.filterBy === FILTER_BY.DONE ? true : false,
      },
      order: [["createdAt", req.query.order]],
      limit:req.query.pp,
      offset: (req.query.page - 1) * limit
    })
    }  else {
        tasks = await db.Task.findAll({
        order: [["createdAt", req.query.order]],
        limit:req.query.pp,
        offset: (req.query.page - 1) * limit
        // offset: req.query.page * limit
      })
    }
    let todoCount = tasks.length;

    // if (req.query.order === TASKS_ORDER.ASC) {
    //   tasks = tasks.sort((prev, next) => {
    //     return new Date(prev.createdAt) - new Date(next.createdAt);
    //   });
    // }
    // if (req.query.order === TASKS_ORDER.DESC) {
    //   tasks = tasks.sort((prev, next) => {
    //     return new Date(next.createdAt) - new Date(prev.createdAt);
    //   });
    // }
    // if (req.query.filterBy === FILTER_BY.DONE) {
    //   tasks = tasks.filter((task) => task.done);
    //   todoCount = tasks.length;
    // }
    // if (req.query.filterBy === FILTER_BY.UNDONE) {
    //   tasks = tasks.filter((task) => !task.done);
    //   todoCount = tasks.length;
    // }
    // if (req.query.pp && req.query.page) {
    //   const lastTaskIndex = req.query.page * req.query.pp;
    //   const firstTaskIndex = lastTaskIndex - req.query.pp;
    //   tasks = tasks.slice(firstTaskIndex, lastTaskIndex);
    // }

    res.send({ count: todoCount, tasks });
    // res.send(tasks);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
