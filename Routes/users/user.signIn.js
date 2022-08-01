const express = require("express");

const db = require("../../models")
const router = express.Router();
const bcrypt = require('bcrypt')

const { defaultError } = require("../../errors");
const { createPair } = require("../../utilis/token")


router.post("/reg", async function (req, res) {
  try {
    const { body: { login, password } } = req;

    const latinRegExp = /^(?=.{5,30}$)[a-zA-Z0-9]+(?:[-][a-zA-Z0-9]+)?$/g; 
    const cyrillicRegexp = /^(?=.{5,30}$)[ЁёА-я0-9]+(?:[-][ЁёА-я0-9]+)?$/g

    if (!login || !latinRegExp.test(login) && !cyrillicRegexp.test(login)) {
      throw defaultError(
        422,
        "Invalid fields in request! Create another name"
      );
    }

    // if (login.length < 5 || login.length > 30) {
    //   throw defaultError(
    //     400,
    //     "Invalid name. It should have 5 - 30 symbols" 
    //   );
    // }
    
    const encryptedPassword = await bcrypt.hash(password, 10)

    const [newUser, sameUser] = await db.User.findOrCreate({
      where: {
        login: login
      },
      password: encryptedPassword
    })

    console.log('Login: ', login)

    console.log('Same nameeee: ', sameUser)

    if (!sameUser) {
      throw defaultError(400, "User with this name already exists");
    }

    const { id } = newUser;
    const { access, refresh } = await createPair(id)
    return res.send({ access, refresh, ...newUser.toJSON() });
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;