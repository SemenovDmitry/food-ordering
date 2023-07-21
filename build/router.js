"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = __importDefault(require("/controllers/categoryController"));
const brandController_1 = __importDefault(require("/controllers/brandController"));
const menuController_1 = __importDefault(require("/controllers/menuController"));
const productController_1 = __importDefault(require("/controllers/productController"));
const router = (0, express_1.Router)();
router.use('/categories', categoryController_1.default);
router.use('/brands', brandController_1.default);
router.use('/menu', menuController_1.default);
router.use('/products', productController_1.default);
exports.default = router;
