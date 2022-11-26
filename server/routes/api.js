const express = require("express");
const apiController = require("../controllers/apiController");

const router = express.Router();

router.post(
  "/",
  apiController.basicTestRunner,
  apiController.getTranslation,
  (req, res, next) => {
    res
      .setHeader("Access-Control-Allow-Origin", "*")
      .status(200)
      .json(res.locals.text);
  }
);

module.exports = router;
