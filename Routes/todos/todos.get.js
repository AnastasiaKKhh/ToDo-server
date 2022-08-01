const c = require("config");
const express = require("express");
const isAuth = require("../../middlewares/isAuth");
const router = express.Router();
const db = require("../../models");

router.get("/todos", isAuth, async function (req, res) {
  try {
    const {
      query: { page = 1, pp = 5, filterBy, order = "asc" },
      user: { id: userId } } = req;

    const FILTERS = {
      done: true,
      undone: false,
    };
    const whereCondition = filterBy ? { done: FILTERS[filterBy], user_id: userId } : {user_id: userId};
    const tasks = await db.Task.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", order]],
      limit: pp,
      offset: (+page - 1) * +pp,
      // include: [{
      //   model: db.User,
      //   where: { 
      //     id: userId 
      //   },
      // }] /// наоборот (ищем по юзер и инклюдим таскм)
    });

    const { rows, count } = tasks;
  
    return res.send({ count, tasks: rows });
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
