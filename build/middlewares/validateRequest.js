"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const util_1 = require("util");
const validateRequest = (schema) => (request, response, next) => {
    const { body, query, params } = request;
    try {
        schema.parse({ body, query, params });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            (0, util_1.inspect)(error);
            return response.status(400).send(error.format());
        }
        return next(error);
    }
};
exports.default = validateRequest;
