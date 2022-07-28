const express = require("express");
const { defaultError } = require("../../errors");
const fs = require("fs").promises;

const router = express.Router();
const db = require("../../models")


router.delete("/todo/:uuid", async function (req, res) {
  try {
    const {params: { uuid }} = req; 
    const deletedTask = await db.Task.destroy({
      where: {
        uuid: uuid,
      },
    });

  if(!deletedTask) {
    throw defaultError(404, "Task not found")
  }

  console.log("Task delete: ", deletedTask)
  return res.send('task was deleted')
} catch(error) {
  return res.status(error.status).send(error)
}
});

module.exports = router;
