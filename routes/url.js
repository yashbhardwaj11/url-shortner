const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteURL
} = require("../controllers/url");

const { restrictToLoggedInUserOnly } = require("../middlewares/auth");

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

router.delete("/:shortId",restrictToLoggedInUserOnly, handleDeleteURL);

module.exports = router;
