const express = require("express");
const fs = require("fs").promises;

const router = express.Router();

router.delete("/todo/:uuid", function (req, res) {
  const { params: { uuid } } = req;
    fs.readFile("data.json")
      .then((data) => {
        const tasks = JSON.parse(data);
        const deletedTask = tasks.find(item => item.uuid === uuid)
        newTasks = tasks.filter((task) => task.uuid !== deletedTask.uuid)
        fs.writeFile("data.json", JSON.stringify(newTasks));
        console.log(deletedTask)
        return res.send(`Task with uuid ${deletedTask.uuid} was deleted`);
      })
  });

module.exports = router;