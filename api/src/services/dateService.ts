import type { FastifyPluginCallback } from 'fastify';
import plugin from 'fastify-plugin';

/**
 * @description Date service takes care of date related operations.
 * Every date related operations should be done through this service.
 */
class DateService {

  /**
   * @description Return the first monday Date of the given year.
   * @param {number} year Year to get the first monday of
   * @returns Date
   */
  public getFirstMondayOfYear(year: number): Date {
    if (year <= 0 || !Number.isInteger(year) || year >= 3000)
      throw new Error('Invalid year format');

    const date = new Date(year, 0, 1);

    while (date.getDay() !== 1) {
      date.setDate(date.getDate() + 1);
    }

    return date;
  };
};

// Decorate FastifyInstance with DateService
export type TDateService = typeof DateServiceInstance;
const DateServiceInstance = new DateService();
export default plugin((async (fastify, opts, done) => {
  // Check if service is already registered
  if (fastify.hasDecorator('_dateService'))
    return fastify.log.warn('DateService already registered');

  fastify.decorate('_dateService', { getter: () => DateServiceInstance });
  done();
}) as FastifyPluginCallback);
