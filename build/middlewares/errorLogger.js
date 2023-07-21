"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorLogger(error, request, response, next) {
    console.log(`Error message >>> ${error.message}`);
    next(error); // calling next middleware
}
exports.default = errorLogger;
