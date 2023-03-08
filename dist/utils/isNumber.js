"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = void 0;
const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
exports.isNumber = isNumber;
