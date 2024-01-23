const express = require("express");
const cors = require("cors");

const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());

const apiLimiter = new rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minute
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", apiLimiter);


var corsOptions = {
    origin: process.env.URI || "http://localhost:3000",
    optionsSuccessStatus: 200,
};


module.exports = { app };