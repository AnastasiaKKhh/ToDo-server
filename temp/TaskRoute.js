// const express = require("express");
// const fs = require("fs").promises;
// const fns = require('../node_modules/date-fns/format')

// const uuid = require('uuid');
// const router = express.Router();


// router.get("/todos", function (req, res) {
//   fs.readFile("data.json")
//     .then((data) => {
//       let tasks = JSON.parse(data);
//       console.log(req.query)
//       if (req.query.order === 'asc') {
//         tasks = tasks.sort((prev, next) => {
//           return new Date(prev.createdAT) - new Date(next.createdAT);
//         })
//       }
//       if (req.query.order === 'desc') {
//         tasks = tasks.sort((prev, next) => {

//           return new Date(next.createdAT) - new Date(prev.createdAT);
//         })

//       }
//       if (req.query.filterBy) {
//         if (req.query.filterBy === 'done') {
//           tasks = tasks.filter(task => task.done === true)
//         } else { tasks = tasks.filter(task => !task.done === true) }
//       }

//       res.send({ count: tasks.length, tasks });
//     })
// });

// const addNewTask = (task, tasks) => {

//   task.name = task.name;
//   task.uuid = uuid.v1();
//   task.done = false;
//   task.createdAT = fns(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

//   tasks.push(task);

//   fs.writeFile("data.json", JSON.stringify(tasks));
// };

// router.post("/todo", function (req, res, next) {
//   try {
//     if (!req.body.name) {
//       const error = new Error('Invalid fields in request!!!');
//       error.status = 422;
//       return next (error)
//     }

//     fs.readFile("data.json")
//       .then((data) => {
//         const tasks = (JSON.parse(data));
//         console.log(req.body)
//         addNewTask(req.body, tasks);
//         res.send('Task was created!');
//       })
//   } catch (error) {
//     console.log('Mess: ',error.message);
//     console.log('Status: ',error.status);
//     console.log(error)
//     return res.send(error.message)
//   }
// });


// router.delete("/todo/:uuid", function (req, res) {
//   fs.readFile("data.json")
//     .then((data) => {
//       const tasks = JSON.parse(data);
//       newTasks = tasks.filter((task) => task.uuid !== req.params.uuid)
//       fs.writeFile("data.json", JSON.stringify(newTasks));
//       return res.send('Task was deleted!!');
//     })
// });

// router.patch("/todo/:uuid", function (req, res) {
//   const { params: { uuid }, body } = req;

//   fs.readFile("data.json")
//     .then((data) => {
//       const tasks = JSON.parse(data);
//       newTasks = tasks.filter((task) => task.uuid !== uuid)

//       const oldTask = tasks.find(item => item.uuid === uuid)
//       const updatedTask = { ...oldTask, ...body };

//       newTasks.push(updatedTask)

//       fs.writeFile("data.json", JSON.stringify(newTasks));

//       return res.send('Task was updated!!');
//     })
// });

// module.exports = router;
