const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', done => {
        const from = 'Admin';
        const text = 'Test message';
        const message = generateMessage(from, text);
        // expect(message.from).toBe(from);
        // expect(message.text).toBe(text);
        expect(message).toMatchObject({
            from,
            text
        })
        expect(typeof message.createdAt).toBe('number');
        done();
    });
});
