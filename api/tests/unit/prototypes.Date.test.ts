import '../../src/prototypes/Date';

describe('prototypes/Date.ts', () => {
    it('firstDayOfYear()', () => {
        expect(Date.firstDayOfYear(0, 2025).toUTCString().startsWith('Sun')).toBe(true);
        expect(Date.firstDayOfYear(1, 2025).toUTCString().startsWith('Mon')).toBe(true);
        expect(Date.firstDayOfYear(2, 2025).toUTCString().startsWith('Tue')).toBe(true);
        expect(Date.firstDayOfYear(3, 2025).toUTCString().startsWith('Wed')).toBe(true);
        expect(Date.firstDayOfYear(4, 2025).toUTCString().startsWith('Thu')).toBe(true);
        expect(Date.firstDayOfYear(5, 2025).toUTCString().startsWith('Fri')).toBe(true);
        expect(Date.firstDayOfYear(6, 2025).toUTCString().startsWith('Sat')).toBe(true);
        expect(Date.firstDayOfYear('sunday', 2025).toUTCString().startsWith('Sun')).toBe(true);
        expect(Date.firstDayOfYear('monday', 2025).toUTCString().startsWith('Mon')).toBe(true);
        expect(Date.firstDayOfYear('tuesday', 2025).toUTCString().startsWith('Tue')).toBe(true);
        expect(Date.firstDayOfYear('wednesday', 2025).toUTCString().startsWith('Wed')).toBe(true);
        expect(Date.firstDayOfYear('thursday', 2025).toUTCString().startsWith('Thu')).toBe(true);
        expect(Date.firstDayOfYear('friday', 2025).toUTCString().startsWith('Fri')).toBe(true);
        expect(Date.firstDayOfYear('saturday', 2025).toUTCString().startsWith('Sat')).toBe(true);

        expect(() => Date.firstDayOfYear(7, 2025)).toThrow();
    });

    it('tomorrow()', () => {
        expect(Date.tomorrow().getUTCDate()).toBe(new Date(Date.now()).getUTCDate() + 1);
    });
});
