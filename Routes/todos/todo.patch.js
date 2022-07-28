const express = require("express");
const fs = require("fs").promises;

const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models");

router.patch("/todo/:uuid", async function (req, res) {
  try {
    const {
      params: { uuid },
      body,
    } = req;

    const regExp = /[a-zA-Z0-9]/g;
    if (body.name) {
      if (!body.name || !regExp.test(body.name)) {
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

    const [rowsCount,updatedTask] = await db.Task.update({ ...body }, { 
      where: { 
        uuid: uuid 
      },
      returning: true,
      plain: true
      });

    return res.send(updatedTask);
  } catch (error) {
    return res.status(error.status).send(error);
  }
});

module.exports = router;
