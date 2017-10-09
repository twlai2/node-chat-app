const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', done => {
        const param = 123;
        const returnValue = isRealString(param);
        expect(returnValue).toBe(false);
        done();
    })

    it('should reject string with only spaces', done => {
        const param = '     ';
        const returnValue = isRealString(param);
        expect(returnValue).toBe(false);
        done();
    })

    it('should allow string with non-space characters', done => {
        const param = '  string  ';
        const returnValue = isRealString(param);
        expect(returnValue).toBe(true);
        done();
    })
})