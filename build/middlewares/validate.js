"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validate = (schema) => async (request, response, next) => {
    const { body } = request;
    try {
        await schema.parseAsync(body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const bodyErrors = error.format();
            const invalidPaths = error.flatten();
            return response.status(400).send(invalidPaths);
        }
        return next(error);
    }
};
exports.default = validate;
