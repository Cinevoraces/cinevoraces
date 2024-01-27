import { sanitizeHTMLString, sanitizeObject } from '../../src/utils';

describe('utils/sanitizer.ts', () => {
    it('sanitizeHTMLString()', () => {
        const str = '<p>Hello <strong>World</strong></p>';
        expect(sanitizeHTMLString(str)).toBe('Hello World');
    });

    it('sanitizeObject()', () => {
        const obj = {
            name: '<p>John</p>',
            description: '<p>Hello <strong>World</strong></p>',
        };
        expect(sanitizeObject(obj)).toEqual({
            name: 'John',
            description: 'Hello World',
        });
    });

    it('sanitizeObject() - with nested objects', () => {
        const obj = {
            name: '<p>John</p>',
            details: {
                description: '<p>Hello <strong>World</strong></p>',
            },
        };
        expect(sanitizeObject(obj)).toEqual({
            name: 'John',
            details: {
                description: 'Hello World',
            },
        });
    });
});
