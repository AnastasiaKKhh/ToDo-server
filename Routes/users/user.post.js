const express = require("express");

const uuid = require("uuid");
const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models")

router.post("/reg", async function (req, res) {
  try {
    const { body: { login, password } } = req;
    const regExp = /[a-zA-Z0-9]/g;
    if (!login || !regExp.test(login)) {
      throw defaultError(
        422,
        "Invalid fields in request! Create another name"
      );
    }
    if (login.length > 20) {
      throw defaultError(
        500,
        "Too many symbols. Max is 20"
      );
    }
    const [newUser,sameUser] = await db.User.findOrCreate({
      where: {
         login: login,
         password: password
      }
    })
    if (!sameUser) {
      throw defaultError(400, "User with this name already exists");
    }
    console.log(sameUser)
    res.send(newUser);
  } catch (error) {
    return res.status(error.status||500).send(error);
  }
});

module.exports = router;