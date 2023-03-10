"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8080';
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    next();
});
app.get('/', (req, res) => {
    res.send('Express and TypeScript Server');
});
// Error-handling
app.use((err, req, res, next) => {
    const { message, status } = err;
    return res.status(status !== null && status !== void 0 ? status : 500).json({ error: message });
});
const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// Graceful Shutdown. Signal to kill all process and to cause program termination
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    console.log('Closing http server...');
    server.close(() => {
        console.log('Http server closed.');
        process.exit(0); // Kill all EventLoop processes. Argument 0 means exit with a "success" code. The "failure" code is 1
    });
});
