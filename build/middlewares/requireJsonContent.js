"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requireJsonContent(request, response, next) {
    if (request.headers['content-type'] !== 'application/json') {
        response.status(400).send({ message: 'Server requires application/json' });
    }
    else {
        next();
    }
}
exports.default = requireJsonContent;
