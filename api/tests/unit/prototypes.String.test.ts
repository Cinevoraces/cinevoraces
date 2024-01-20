import '../../src/prototypes/String';

describe('prototypes/String.ts', () => {
    it('validates password', () => {
        expect('Password123!'.is('valid-password')).toBe(true);
        expect('password123!'.is('valid-password')).toBe(false);
        expect('Password1234'.is('valid-password')).toBe(false);
    });

    it('validates email', () => {
        expect('test@example.com'.is('valid-mail')).toBe(true);
        expect('testexample.com'.is('valid-mail')).toBe(false);
    });

    it('validates pseudo', () => {
        expect('moi'.is('valid-pseudo')).toBe(false);
        expect('notmoi'.is('valid-pseudo')).toBe(true);
    });

    it('returns false for invalid type', () => {
        // @ts-expect-error Testing invalid type
        expect('test'.is('invalid-type')).toBe(false);
    });
});
