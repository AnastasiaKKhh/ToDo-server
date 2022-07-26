const express = require("express");
const { defaultError } = require("../../errors");
const fs = require("fs").promises;

const router = express.Router();


router.delete("/todo/:uuid", async function (req, res) {
  try {
  const {params: { uuid }} = req;
  const data = await fs.readFile("data.json");

  const tasks = JSON.parse(data);
  const deletedTask = tasks.find((item) => item.uuid === uuid);

  if(!deletedTask) {
    throw defaultError(404, "Task not found")
  }
  newTasks = tasks.filter((task) => task.uuid !== deletedTask.uuid);
  fs.writeFile("data.json", JSON.stringify(newTasks));
  console.log(deletedTask);
  return res.send(`Task with uuid ${deletedTask.uuid} was deleted`);
} catch(error) {
  return res.status(error.status).send(error)
}
});

module.exports = router;
