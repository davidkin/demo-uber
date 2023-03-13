"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readConfig = () => {
    var _a;
    return ({
        name: 'demo-uber',
        port: (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8080',
        version: '1.0'
    });
};
const config = readConfig();
exports.default = config;
