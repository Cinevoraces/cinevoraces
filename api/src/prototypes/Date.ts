type NamedDay = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

const NamedDays: Record<NamedDay, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
};

const registerDatePrototypes = () => {
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
};

declare global {
    interface DateConstructor {
        firstDayOfYear(day: number | NamedDay, year: number): Date;
        tomorrow(): Date;
    }
}

export default registerDatePrototypes;
