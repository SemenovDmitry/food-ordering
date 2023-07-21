"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requestLogger(request, response, next) {
    console.log(`${request.method} url:: ${request.url}`);
    next();
}
exports.default = requestLogger;
