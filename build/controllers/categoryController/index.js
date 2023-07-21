"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const connection_1 = __importDefault(require("prisma/connection"));
const validate_1 = __importDefault(require("middlewares/validate"));
const categorySchema = (0, zod_1.object)({
    name: (0, zod_1.string)().min(3),
}).strict();
const extractBodyCategory = ({ name }) => ({ name });
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        const data = await connection_1.default.category.findMany();
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
router.get('/:categoryId', async (req, res, next) => {
    const { categoryId } = req.params;
    try {
        const data = await connection_1.default.category.findFirst({
            where: { id: Number(categoryId) },
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
router.post('/', (0, validate_1.default)(categorySchema), async (req, res, next) => {
    const category = req.body;
    try {
        const data = await connection_1.default.category.create({ data: category });
        return res.status(200).json(data);
    }
    catch (error) {
        return next(error);
    }
});
router.put('/:categoryId', (0, validate_1.default)(categorySchema), async (req, res, next) => {
    const { categoryId } = req.params;
    const category = req.body;
    try {
        const data = await connection_1.default.category.update({
            where: { id: Number(categoryId) },
            data: category,
        });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
router.delete('/:categoryId', async (req, res, next) => {
    const { categoryId } = req.params;
    try {
        const data = await connection_1.default.category.delete({
            where: { id: Number(categoryId) },
        });
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
