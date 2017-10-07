const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

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

describe('generateLocationMessage', () => {
    it('should generate correct location object', done => {
        const from = 'Admin';
        const latitude = 1;
        const longitude = 1;
        const locationMessage = generateLocationMessage(from, latitude, longitude);
        expect(locationMessage.from).toBe(from);
        expect(locationMessage.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(typeof locationMessage.createdAt).toBe('number');
        done();
    });
});
