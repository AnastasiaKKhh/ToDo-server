const express = require("express");
const { createPair, verify } = require("../../utilis/token")

const router = express.Router();
router.post("/refresh", async function (req, res) {
  try {
    const { body: { token } } = req;
    const { id } = verify(token);
    const { access, refresh } = await createPair(id);

    return res.send({ access, refresh })
  } catch (error) {
    return res.status(error.status || 500).send(error);
  }
});

module.exports = router;