"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, // Error || AppError
request, response, next) {
    response.header('Content-Type', 'application/json');
    const status = error.status || 500;
    const message = error.message || 'NO ERROR MESSAGE';
    const stack = error.stack || 'NO ERROR STACK';
    return response.status(status).send({ message, stack });
}
exports.default = errorHandler;
