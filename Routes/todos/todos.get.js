const c = require("config");
const express = require("express");
const router = express.Router();
const db = require("../../models");

router.get("/todos", async function (req, res) {
  try {
    const {
      query: { page = 1, pp = 5, filterBy, order = "asc" },
    } = req;
    let tasks;

    const FILTERS = {
      done: true,
      undone: false,
    };
    const whereCondition = filterBy ? { done: FILTERS[filterBy] } : {};

    tasks = await db.Task.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", order]],
      limit: pp,
      offset: (+page - 1) * +pp,
    });

    const { rows, count } = tasks;
    return res.send({ count, tasks: rows });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
