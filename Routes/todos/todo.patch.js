const express = require("express");
const fs = require("fs").promises;

const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models")

router.patch("/todo/:uuid", async function (req, res) {
  try {
    const {params: { uuid },body,} = req;
  
   

    const regExp = /[a-zA-Z0-9]/g;
    if (body.name) {
      if (!body.name || !regExp.test(body.name)) {
      throw defaultError(
        422,
        "Invalid fields in request! Try to rewrite your task"
      );
    }
    if (body.name.length > 250) {
      throw defaultError(
        500,
        "Too many symbols. Max is 250"
      );
    }
    }
    
     await db.Task.update({ ...body }, { where: { uuid: uuid } });
   const UpdatedTask = await db.Task.findOne({
    where: { uuid: uuid }
   })
    // const data = await fs.readFile("data.json");
    // const tasks = JSON.parse(data);
    // const sameTask = tasks.find((item) => item.name === body.name && item.uuid !== uuid);

    // if (sameTask) {
    //   throw defaultError(400, "Task not created! Maybe the same task already exists");
    // }
    // const oldTask = tasks.find((item) => item.uuid === uuid);
    // const updatedTask = { ...oldTask, ...body };
    
    // const newTasks = tasks.map((item) => {
    //   if (item.uuid === uuid) {;
    //     return updatedTask;
    //   }
    //   return item;
    // });

    // fs.writeFile("data.json", JSON.stringify(newTasks));

    // return res.send(updatedTask);
    return res.send(UpdatedTask);
  } catch (error) {
    return res.status(error.status).send(error);
  }
});

module.exports = router;
