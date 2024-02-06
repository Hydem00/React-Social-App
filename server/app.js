const express = require("express");
const cors = require("cors");
const connectToDb = require("./utils/db");
const post = require("./routes/post");
const user = require("./routes/user");
const auth = require("./routes/auth");
const docs = require("./routes/docs");
const rateLimit = require("express-rate-limit");

const errorHandler = require("./utils/errorHandler");


const app = express();

connectToDb();
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

// Mount your routes with CORS options
app.use("/api/posts", cors(corsOptions), post);
app.use("/api/auth", cors(corsOptions), auth);
app.use("/api/users", cors(corsOptions), user);
app.use("/api/docs", cors(corsOptions), docs);

// Redirect to API docs from root
app.get('/', (req, res) => {
    res.redirect('/api/docs');
});

// Wildcard route for handling 404 - Place this at the end
app.all('*', (req, res) => {
    res.status(404).json({
        status: "error",
        message: `There is no such endpoint.`
    });
});

app.use(errorHandler);

module.exports = { app };
