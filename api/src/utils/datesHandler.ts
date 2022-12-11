/**
 * **getFirstMondayOfYear**
 * @description Return first monday Date of the given year.
 * @param year number
 * @returns Date
 */
export const getFirstMondayOfYear = (year: number) => {
  if (year < 0 || !Number.isInteger(year) || year > 3000)
    throw new Error('Invalid year format');

  const date = new Date(year, 0, 1);

  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1);
  }

  return date;
};
