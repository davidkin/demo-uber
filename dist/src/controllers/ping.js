"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingCheck = void 0;
const pingCheck = (req, res, next) => {
    try {
        return res.status(200).json({ message: 'Pong!' });
    }
    catch (err) {
        next(err);
    }
};
exports.pingCheck = pingCheck;
