"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isNumber_1 = require("./isNumber");
describe('isNumber Utils', () => {
    it('Its a number', () => {
        [0, 1, 2, -1, 1.345e17, '1'].map((n) => {
            expect((0, isNumber_1.isNumber)(n)).toEqual(true);
        });
    });
    it('Its not a number', () => {
        [false, true, NaN, [], {}, '1a'].map((n) => {
            expect((0, isNumber_1.isNumber)(n)).toEqual(false);
        });
    });
});
