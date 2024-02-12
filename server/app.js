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

const isRateLimitEnabled = process.env.RATE_LIMIT_ENABLED || 'true';

if (process.env.RATE_LIMIT_ENABLED === 'true') {
    const apiLimiter = rateLimit({
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
        max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    });

    app.use("/api/", apiLimiter);
}

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

app.use(express.static('public'));
app.get('/api/avatar/default', (req, res) => {
    res.sendFile('default_avatar.webp', { root: './public' });
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
