require("dotenv").config();
const { app } = require("./app");

const port = process.env.APP_PORT || 5000;
const host = process.env.APP_HOST || "localhost";

app.listen(port,
    console.log(`App is ready! \nWebAPI ready and listening on port http://${host}:${port}`)

);