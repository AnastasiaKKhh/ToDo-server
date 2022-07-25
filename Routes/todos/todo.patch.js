const express = require("express");
const fs = require("fs").promises;

const router = express.Router();

router.patch("/todo/:uuid", function (req, res) {
    const { params: { uuid }, body } = req;
  
    fs.readFile("data.json")
      .then((data) => {
        const tasks = JSON.parse(data);
        const oldTask = tasks.find(item => item.uuid === uuid)
        const updatedTask = { ...oldTask, ...body };
        
        const newTasks = tasks.map((item) => {
          if (item.uuid === uuid) {
            const newItem = { ...item, ...body }
            return newItem
          }
          return item
        })

        fs.writeFile("data.json", JSON.stringify(newTasks));
  
        return res.send(updatedTask);
      })
  });

  module.exports = router