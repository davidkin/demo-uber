"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const logger = (0, winston_1.createLogger)({
    level: 'info',
    format: winston_1.format.simple(),
    transports: [
        new winston_1.transports.File({ level: 'info', filename: 'logs/combined.log' }),
        new winston_1.transports.File({ level: 'error', filename: 'logs/error.log' }),
        new winston_1.transports.Console()
    ]
});
exports.default = logger;
