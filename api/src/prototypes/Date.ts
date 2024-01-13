// WARNING: While reviewing this code, you have to check that this still imported
// as server.ts as been removed on another branch.

type NamedDay = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

const NamedDays: Record<NamedDay, number> = {
    saturday: 0,
    sunday: 1,
    monday: 2,
    tuesday: 3,
    wednesday: 4,
    thursday: 5,
    friday: 6,
};

Object.assign(Date, {
    /**
     * @description Return the first given day of the given year.
     * @param {number} year Year to get the first given day of
     * @param {number} year Year to get the first monday of
     * @returns Date
     */
    firstDayOfYear(day: number | NamedDay, year: number): Date {
        day = typeof day === 'number' ? day : NamedDays[day];

        if (year <= 0 || !Number.isInteger(year) || year >= 3000) throw new Error('Invalid year format');
        if (day < 0 || !Number.isInteger(day) || day >= 7) throw new Error('Invalid day format');

        const date = new Date(year, 0, 1);

        while (date.getDay() !== day) {
            date.setDate(date.getDate() + 1);
        }

        return date;
    },
    /**
     * @description Return tomorrow's date.
     * @returns Date
     */
    tomorrow(): Date {
        return new Date(Date.now() + 86400000);
    },
});

declare global {
    interface DateConstructor {
        firstDayOfYear(day: number | NamedDay, year: number): Date;
        tomorrow(): Date;
    }
}

export default Date;
