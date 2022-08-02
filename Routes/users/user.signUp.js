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
        "Login should contain 5-30 chars, no spaces and no special symbols except -"
      );
    }

    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d~ !?@#$%^&*_\-+( )[ \]{ } > < \/ \\ | " ' . , : ;]{8,128}$/g
    const passwordRegExpCyrillic = /^(?=.*[ёа-я])(?=.*[ЁА-Я])(?=.*\d)[Ёёа-яА-Я\d~ !?@#$%^&*_\-+( )[ \]{ } > < \/ \\ | " ' . , : ;]{8,128}$/g

    if (!passwordRegExp.test(password) && !passwordRegExpCyrillic.test(password)) {
      throw defaultError(
        422,
        "Password should contain 8-128 chars, at least 1 uppercase and lowercase letter and 1 number"
      );
    }
    
    const encryptedPassword = await bcrypt.hash(password, 10)

    const [newUser, sameUser] = await db.User.findOrCreate({
      where: {
        login: login,
      },
      defaults: {
        password: encryptedPassword
      },
    })

    if (!sameUser) {
      throw defaultError(400, "User with this name already exists");
    } 

    const { id } = newUser;
    const { access, refresh } = await createPair(id)
    const {login: userLogin} = newUser

    return res.send({ access, refresh, login: userLogin, id});
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;