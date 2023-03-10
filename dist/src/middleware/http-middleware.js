"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpLog = (req, res, next) => {
    res.on('finish', function () {
        console.log(req.method, decodeURI(req.url), res.statusCode, res.statusMessage);
    });
    next();
};
exports.default = httpLog;
