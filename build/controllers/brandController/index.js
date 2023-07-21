"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const connection_1 = __importDefault(require("prisma/connection"));
const validate_1 = __importDefault(require("middlewares/validate"));
const brandSchema = (0, zod_1.object)({
    name: (0, zod_1.string)().min(3),
});
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        const data = await connection_1.default.brand.findMany();
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
router.get('/:brandId', async (req, res, next) => {
    const { brandId } = req.params;
    try {
        const data = await connection_1.default.brand.findFirst({
            where: { id: Number(brandId) },
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
router.post('/', (0, validate_1.default)(brandSchema), async (req, res, next) => {
    const brand = req.body;
    try {
        const data = await connection_1.default.brand.create({ data: brand });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
router.put('/:brandId', (0, validate_1.default)(brandSchema), async (req, res, next) => {
    const { brandId } = req.params;
    const brand = req.body;
    try {
        const data = await connection_1.default.brand.update({
            where: { id: Number(brandId) },
            data: brand,
        });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
router.delete('/:brandId', async (req, res, next) => {
    const { brandId } = req.params;
    try {
        const data = await connection_1.default.brand.delete({
            where: { id: Number(brandId) },
        });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
