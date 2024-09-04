const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res, next) {
  const body = req.body;
  if (!body.url) {
    return res.render("home", {
      error: "Please enter a URL to shorten.",
      urls: await URL.find({}),
    });
  }

  const shortId = shortid();
  try {
    const url = await URL.create({
      shortId,
      redirectURL: body.url,
      visitHistory: [],
      createdBy: req.user._id,  // Ensure req.user is correctly set
    });


    return res.status(200).redirect("/");
  } catch (error) {
    console.error('Error creating short URL:', error);
    return res.status(500).send('Internal Server Error');
  }
}


async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  try {
      const url = await URL.findOne({ shortId });
      if (!url) return res.status(404).json({ error: "URL not found" });

      res.render("analytics", {
          shortId: url.shortId,
          redirectURL: url.redirectURL,
          totalClicks: url.visitHistory.length,
          visitHistory: url.visitHistory
      });
  } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).send("Internal Server Error");
  }
}


async function handleDeleteURL(req, res) {
  const shortId = req.params.shortId;
  try {
      const result = await URL.deleteOne({ shortId });
      if (result.deletedCount === 0) {
          return res.status(404).send('URL not found.');
      }
      res.status(200).send('URL deleted successfully.');
  } catch (error) {
      console.error('Error deleting URL:', error);
      res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleDeleteURL
};
