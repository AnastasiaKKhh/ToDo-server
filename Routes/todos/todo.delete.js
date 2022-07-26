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
  const newTasks = tasks.filter((task) => task.uuid !== deletedTask.uuid);
  
  fs.writeFile("data.json", JSON.stringify(newTasks));;
  return res.send(deletedTask.uuid);
} catch(error) {
  return res.status(error.status).send(error)
}
});

module.exports = router;
