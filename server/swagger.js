const swaggerAutogen = require('swagger-autogen')({ openapi: "3.0.0", language: 'pl-PL', autoHeaders: false })
const outputFile = './swagger-output.json'
const routesFiles = ['./app.js'] //['./app.js', './routes/*.js']
const dotenv = require('dotenv').config()

const config = {
    apiAddress: process.env.SWAG_DOMAIN || "localhost:" + process.env.APP_PORT,
    swag_name: process.env.SWAG_NAME || "Social APP",
    swag_desc: process.env.SWAG_DESC || "",
    swag_ver: process.env.SWAG_VERSION || "2.1.0",
    schemes: process.env.SWAG_SCHEMES?.split(", ") || ['http', 'https']
}

const doc = {
    info: {
        version: config.swag_ver,
        title: config.swag_name,
        description: config.swag_desc,
        license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
        },
        contact: {
            name: "",
            url: "https://github.com/xSauron",
            email: "",
        },
    },
    host: config.apiAddress,
    basePath: "/",
    schemes: config.schemes,
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "General",
            "description": ""
        }

    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter your JWT token as: Bearer <token>'
        },
    },
}

swaggerAutogen(outputFile, routesFiles, doc)