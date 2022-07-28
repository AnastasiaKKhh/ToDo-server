const express = require("express");

const router = express.Router();
const { defaultError } = require("../../errors");
const db = require("../../models");

router.patch("/user/:id", async function (req, res) {
  try {
    const {
      params: { id },
      body,
    } = req;

    const regExp = /[a-zA-Z0-9]/g;
    if (body.login) {
      if (!body.login || !regExp.test(body.login)) {
        throw defaultError(
          422,
          "Invalid fields in request! Create another name"
        );
      }
      if (body.login.length > 20) {
        throw defaultError(500, "Too many symbols. Max is 20");
      }
      const sameUser = await db.User.findOne({
        where: {
          login: body.login,
        },
      });
      if (sameUser) {
        throw defaultError(
          400,
          "User with this name already exists"
        );
      }
    }

    const [_, updatedUser] = await db.User.update(
      { ...body },
      {
        where: {
          id: id,
        },
        returning: true,
        plain: true,
      }
    );

    return res.send(updatedUser);
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;