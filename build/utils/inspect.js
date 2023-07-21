"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __importDefault(require("util"));
const inspect = (item, item2) => {
    console.log(util_1.default.inspect(item, { depth: null }), util_1.default.inspect(item2, { depth: null }));
};
exports.default = inspect;
