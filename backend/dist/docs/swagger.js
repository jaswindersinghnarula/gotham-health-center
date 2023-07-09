"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function swaggerOptions() {
    return {
        swaggerDefinition: {
            swagger: "2.0",
            info: {
                version: process.env.APP_VERSION,
                title: process.env.APP_NAME,
                description: process.env.APP_DESCRIPTION,
                license: {
                    name: "MIT",
                    url: "https://opensource.org/licenses/MIT",
                },
            },
            host: "localhost:8000",
            basePath: "/",
            tags: [
                {
                    name: "Root",
                    description: "Root endpoint",
                },
            ],
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
            paths: {
                "/": {
                    get: {
                        tags: ["Root"],
                        responses: {
                            200: {
                                description: "OK",
                            },
                        },
                    },
                },
            },
        },
        definitions: {},
        apis: ["./*.js"],
    };
}
exports.default = swaggerOptions;
