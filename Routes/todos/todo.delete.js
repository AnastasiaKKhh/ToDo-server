const express = require("express");
const { defaultError } = require("../../errors");
const router = express.Router();
const db = require("../../models")
const isAuth = require("../../middlewares/isAuth");


router.delete("/todo/:uuid", isAuth, async function (req, res) {
  try {
    const {params: { uuid }} = req; 
    const deletedTask = await db.Task.destroy({
      where: {
        uuid,
      },
    });

  if(!deletedTask) {
    throw defaultError(404, "Task not found")
  }
  
  return res.send(uuid)
} catch(error) {
  return res.status(error.status||500).send(error)
}
});

module.exports = router;
