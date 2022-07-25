const express = require("express");
const fs = require("fs").promises;

const uuid = require("uuid");
const router = express.Router();

router.post("/todo", function (req, res, next) {
  try {
    if (!req.body.name || req.body.name.charAt(0) === " ") {
      const error = new Error("Invalid fields in request!!!");
      error.status = 422;
      return next(error);
    }

    fs.readFile("data.json").then((data) => {
      const tasks = JSON.parse(data);

      const createdTask = {
        name: req.body.name,
        uuid: uuid.v1(),
        done: false,
        createdAt: new Date(),
      };

      tasks.push(createdTask);

      fs.writeFile("data.json", JSON.stringify(tasks));
      res.send(createdTask);
    });
  } catch (error) {
    console.log("Mess: ", error.message);
    console.log("Status: ", error.status);
    console.log(error);
    return res.send(error.message);
  }
});

module.exports = router;
