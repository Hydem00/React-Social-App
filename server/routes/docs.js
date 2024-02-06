const express = require("express");
const path = require("path");

const swaggerUi = require("swagger-ui-express");
const { SwaggerTheme } = require("swagger-themes");
const swaggerFile = require("../swagger-output.json");

const router = express.Router();

var swag_theme = new SwaggerTheme('v3');
var swag_opts = {
    explorer: false,
    customCss: swag_theme.getBuffer('dark')
};

// Serve Swagger UI at the root of this router
router.use("/",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, swag_opts)
);

module.exports = router;