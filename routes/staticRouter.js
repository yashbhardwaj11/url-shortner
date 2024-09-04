const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const {checkAuth} = require("../middlewares/auth")

router.get("/",checkAuth, async (req, res) => {
  try {
    if(!req.user) return res.redirect('/login')
    const urls = await URL.find({ createdBy : req.user.user._id });
    res.render("home", { urls: urls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("Login");
});

module.exports = router;
