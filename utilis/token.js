const jwt = require('jsonwebtoken');
const { refreshToken, accessToken } = require("../config/auth.config")
const { defaultError } = require('../errors');

const createAccessToken = async (id) => {
    return new Promise((resolve, reject) => {
      jwt.sign({ id }, accessToken.salt, { expiresIn: accessToken.expired }, (err, token) => err ? reject({}) : resolve(token))
    })
  }


  const createRefreshToken = async (id) => {
    return new Promise((resolve, reject ) => {
        jwt.sign({id}, refreshToken.salt, {expiresIn: refreshToken.expired}, (err, token) => err? reject({}) : resolve(token))
    })
  }

  const createPair = async (id) => {
    const refresh = await createRefreshToken(id).catch(err => { throw err });
    const access = await createAccessToken(id).catch(err => { throw err });
    return { access, refresh }
  }
  
  const verify = (token) => {
    const payload = jwt.verify(token, accessToken.salt, (err, decoded) => {
      if (err) {
        throw defaultError(401, "Unauthorized");
      }
      return decoded;
    })
    return payload
  }
  
  module.exports = {
    createPair,
    verify
  }