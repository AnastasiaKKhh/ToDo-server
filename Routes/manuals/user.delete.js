const express = require("express");
const { defaultError } = require("../../errors");
const router = express.Router();
const db = require("../../models")


router.delete("/user/:id", async function (req, res) {
  try {
    const {params: { id }} = req; 
    const deletedUser = await db.User.destroy({
      where: {
        id,
      },
    });

  if(!deletedUser) {
    throw defaultError(404, "User not found")
  }
  return res.send(id)
} catch(error) {
  return res.status(error.status||500).send(error)
}
});

module.exports = router;