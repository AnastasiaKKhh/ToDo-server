const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.SERVER_BASE_PORT;
const bp = require("body-parser");

const recursive = require('recursive-readdir-sync');

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

recursive(`${__dirname}/Routes/todos`)
    .forEach(file => app.use(require(file)));
