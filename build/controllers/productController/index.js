"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const connection_1 = __importDefault(require("prisma/connection"));
const validate_1 = __importDefault(require("middlewares/validate"));
const productSchema = (0, zod_1.object)({
    name: (0, zod_1.string)().min(3),
});
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        const data = await connection_1.default.product.findMany({ include: { brand: true, category: true } });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const data = await connection_1.default.product.findFirst({
            where: { id: Number(productId) },
            include: { brand: true, category: true },
        });
        if (!data) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
router.post('/', (0, validate_1.default)(productSchema), async (req, res, next) => {
    const product = req.body;
    try {
        const data = await connection_1.default.product.create({
            data: product,
            include: { brand: true, category: true },
        });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
router.put('/:productId', (0, validate_1.default)(productSchema), async (req, res, next) => {
    const { productId } = req.params;
    const product = req.body;
    try {
        const data = await connection_1.default.product.update({
            where: { id: Number(productId) },
            data: product,
            include: { brand: true, category: true },
        });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
        const data = await connection_1.default.product.delete({
            where: { id: Number(productId) },
            include: { brand: true, category: true },
        });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
