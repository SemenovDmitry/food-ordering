"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const connection_1 = __importDefault(require("prisma/connection"));
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        const data = await connection_1.default.category.findMany({ include: { products: true } });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
