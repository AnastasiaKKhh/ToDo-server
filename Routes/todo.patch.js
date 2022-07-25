const express = require("express");
const fs = require("fs").promises;

const router = express.Router();

router.patch("/todo/:uuid", function (req, res) {
    const { params: { uuid }, body } = req;
  
    fs.readFile("data.json")
      .then((data) => {
        const tasks = JSON.parse(data);
        newTasks = tasks.filter((task) => task.uuid !== uuid)
  
        const oldTask = tasks.find(item => item.uuid === uuid)
        const updatedTask = { ...oldTask, ...body };
  
        newTasks.push(updatedTask)
  
        fs.writeFile("data.json", JSON.stringify(newTasks));
  
        return res.send('Task was updated!!');
      })
  });

  module.exports = router