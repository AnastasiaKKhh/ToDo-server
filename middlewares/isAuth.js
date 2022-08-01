const { defaultError } = require("../errors");
const db = require("../models");
const { verify } = require("../utilis/token.js");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace(/^Bearer /, "");
    const { id } = await verify(token);
    const user = await db.User.findByPk(id);
    
    if (!user) {
      throw defaultError(401, "Unauthorized")
    }
    req.user = user.toJSON();
    next();
  } catch (err) {
    return res.status(err.status||500).send(err);
  }
};

module.exports = isAuth;
