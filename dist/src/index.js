"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const http_middleware_1 = __importDefault(require("./middleware/http-middleware"));
const routes_1 = __importDefault(require("./routes"));
const cors_middleware_1 = __importDefault(require("./middleware/cors-middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8080';
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_middleware_1.default);
app.use(http_middleware_1.default);
app.use('/', routes_1.default);
// Error-handling
app.use((err, req, res, next) => {
    const { message, status } = err;
    return res.status(status !== null && status !== void 0 ? status : 500).json({ error: message });
});
app.use((req, res, next) => {
    return res.status(404).send('Can\'t find the route');
});
const server = app.listen(port, () => {
    logger_1.default.info(`️[server]: Server is running at http://localhost:${port}`);
});
// Graceful Shutdown. Signal to kill all process and to cause program termination
// SIGINT add
process.on('SIGTERM', () => {
    logger_1.default.info('SIGTERM signal received.');
    logger_1.default.info('Closing http server...');
    server.close(() => {
        logger_1.default.info('Http server closed.');
        process.exit(0); // Kill all EventLoop processes. Argument 0 means exit with a "success" code. The "failure" code is 1
    });
});
