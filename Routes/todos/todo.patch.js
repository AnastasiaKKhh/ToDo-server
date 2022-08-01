const express = require("express");

const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models");
const isAuth = require("../../middlewares/isAuth");

router.patch("/todo/:uuid", isAuth, async function (req, res) {
  try {
    const {
      params: { uuid },
      body,
    } = req;

    const regExp = /[a-zA-Z0-9]/g;
    
    if (body.name === '') {
      throw defaultError(
        422,
        "Invalid fields in request! Try to rewrite your task"
      );
    }
    if (body.name) {
      if (!regExp.test(body.name)) {
        throw defaultError(
          422,
          "Invalid fields in request! Try to rewrite your task"
        );
      }
      if (body.name.length > 250) {
        throw defaultError(500, "Too many symbols. Max is 250");
      }
      const sameTask = await db.Task.findOne({
        where: {
          name: body.name,
        },
      });
      if (sameTask) {
        throw defaultError(
          400,
          "Task not created! Maybe the same task already exists"
        );
      }
    }

    const [_, updatedTask] = await db.Task.update(
      { ...body },
      {
        where: {
          uuid: uuid,
        },
        returning: true,
        plain: true,
      }
    );

    return res.send(updatedTask);
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;
