const express = require("express");
const path = require("path"); // Import path module
const UAParser = require("ua-parser-js"); // Import UAParser for user agent parsing
const { connectMongoDb } = require("./connection");
const URL = require("./models/url");
const cookieParser = require("cookie-parser");
const {restrictToLoggedInUserOnly , checkAuth} = require("./middlewares/auth");


const app = express();
const PORT = 3000;

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRouter = require("./routes/staticRouter");



app.use(cookieParser())
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));
app.use(express.urlencoded({ extended: true }));




connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.use("/url",restrictToLoggedInUserOnly, urlRoute);
app.use("/user",checkAuth,userRoute);
app.use("/", staticRouter);



app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const userIp = req.ip;

    const parser = new UAParser();
    const uaResult = parser.setUA(req.headers["user-agent"]).getResult();

    const url = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                    ip: userIp,
                    browser: uaResult.browser.name || "Unknown",
                    operatingSystem: uaResult.os.name || "Unknown",
                    deviceType: uaResult.device.type || "Desktop",
                },
            },
        },
        { new: true }
    );

    if (!url) return res.status(400).json({ error: "URL not found" });

    res.redirect(url.redirectURL);
});

app.listen(PORT, () => console.log(`Server is started at ${PORT}`));
