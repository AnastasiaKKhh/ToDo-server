const express = require("express");
const fs = require("fs").promises;

const router = express.Router();

router.delete("/todo/:uuid", function (req, res) {
    fs.readFile("data.json")
      .then((data) => {
        const tasks = JSON.parse(data);
        newTasks = tasks.filter((task) => task.uuid !== req.params.uuid)
        fs.writeFile("data.json", JSON.stringify(newTasks));
        return res.send('Success!Task was deleted!!');
      })
  });

module.exports = router;