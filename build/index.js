"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const requestLogger_1 = __importDefault(require("./middlewares/requestLogger"));
const requireJsonContent_1 = __importDefault(require("./middlewares/requireJsonContent"));
const errorLogger_1 = __importDefault(require("./middlewares/errorLogger"));
const invalidPathHandler_1 = __importDefault(require("./middlewares/invalidPathHandler"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(requireJsonContent_1.default);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(requestLogger_1.default);
app.use('/api', router_1.default);
app.get('/', (req, res, next) => {
    return res.json({ running: true });
});
app.use(errorLogger_1.default);
app.use(errorHandler_1.default);
app.use(invalidPathHandler_1.default);
app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT} !`);
});
