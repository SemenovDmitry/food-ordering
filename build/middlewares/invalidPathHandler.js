"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function invalidPathHandler(request, response, next) {
    return response.status(404).send({ message: 'invalid path' });
}
exports.default = invalidPathHandler;
