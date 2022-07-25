const express = require("express");
const fs = require("fs").promises;
const fns = require('../node_modules/date-fns/format')

const uuid = require('uuid');
const router = express.Router();

const addNewTask = (task, tasks) => {

    task.name = task.name;
    task.uuid = uuid.v1();
    task.done = false;
    task.createdAT = fns(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
  
    tasks.push(task);
  
    fs.writeFile("data.json", JSON.stringify(tasks));
  };
  
  router.post("/todo", function (req, res, next) {
    try {
      if (!req.body.name) {
        const error = new Error('Invalid fields in request!!!');
        error.status = 422;
        return next (error)
      }
  
      fs.readFile("data.json")
        .then((data) => {
          const tasks = (JSON.parse(data));
          addNewTask(req.body, tasks);
          res.send('Task was created!');
        })
    } catch (error) {
      console.log('Mess: ',error.message);
      console.log('Status: ',error.status);
      console.log(error)
      return res.send(error.message)
    }
  });

  module.exports = router