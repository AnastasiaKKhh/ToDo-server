const c = require("config");
const express = require("express");
const fs = require("fs").promises;
const router = express.Router();
const { FILTER_BY } = require("../../constants");
const db = require("../../models")

router.get("/todos", async function (req, res) {
  try {
    const { query: { page, pp, filterBy, order } } = req;
    let tasks;
  
    if (filterBy) {
      tasks = await db.Task.findAndCountAll({
        where: {
          done: filterBy === FILTER_BY.DONE ? true : false,
        },
        order: [["createdAt", order]],
        limit: pp,
        offset: (+page - 1) * +pp
      })
    } else {
      tasks = await db.Task.findAndCountAll({
        order: [["createdAt", order]],
        limit: pp,
        offset: (+page - 1) * +pp
      })
    }
    const { rows, count } = tasks
    return res.send({ count, tasks: rows });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
