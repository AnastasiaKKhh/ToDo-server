const express = require("express");

const db = require("../../models");
const router = express.Router();
const bcrypt = require('bcrypt')

const { defaultError } = require("../../errors");
const { createPair } = require("../../utilis/token");

router.post("/login", async function (req, res) {
  try {
    const {
      body: { login, password },
    } = req;

    if (!(login && password)) {
      throw defaultError(400, "All input is required");
    }

    const user = await db.User.findOne({
        where: {
          login: login,
        }
      })

    if (!user) {
      throw defaultError(404, "User not found");
    }

    console.log("USER: ",user.password)
    console.log("PASSWORD: ",password)

    const matchPass = await bcrypt.compare(password, user.password)

    if (!matchPass) {
        throw defaultError(404, "Wrong password");
    }

    const { id } = user;
    const { access, refresh } = await createPair(id);

    const {login: userLogin} = user

    return res.send({ access, refresh, login: userLogin, id});
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;
