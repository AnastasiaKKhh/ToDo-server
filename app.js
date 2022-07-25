const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.SERVER_BASE_PORT;
const getRouter = require("./Routes/todos.get");
const postRouter = require("./Routes/todo.post");
const patchRouter = require("./Routes/todo.patch");
const deleteRouter = require("./Routes/todo.delete")
// const myRouter = require("./Routes/TaskRoute");
const bp = require("body-parser");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.use(getRouter);
app.use(postRouter);
app.use(patchRouter);
app.use(deleteRouter)
