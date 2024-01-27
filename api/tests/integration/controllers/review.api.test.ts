import type { InjectOptions } from 'fastify';
import { buildTestServer } from '../../utils/buildTestServer';
import { logUser } from '../../utils/logUser';
import { randomBoolean, randomNumber } from '../../utils/random';

describe('API - Review controller', () => {
    const server = buildTestServer();
    let userHeaders: InjectOptions;

    beforeAll(async () => {
        server.fastify.ready();
        userHeaders = await logUser(server.fastify);
    });
    afterAll(() => server.fastify.close());

    it('API:PUT/reviews/:movieId - should create/update a review', async () => {
        const randomReview = {
            rating: randomNumber(1, 5),
            bookmarked: randomBoolean(),
            viewed: randomBoolean(),
            liked: randomBoolean(),
        };

        const { statusCode: ratingStatus, json: ratingJson } = await server.fastify.inject({
            method: 'PUT',
            url: '/reviews/1',
            ...userHeaders,
            payload: {
                rating: randomReview.rating,
            },
        });
        expect(ratingStatus).toBe(201);
        expect(ratingJson().review.rating).toEqual(randomReview.rating);

        const { statusCode: bookmarkedStatus, json: bookmarkedJson } = await server.fastify.inject({
            method: 'PUT',
            url: '/reviews/1',
            ...userHeaders,
            payload: {
                bookmarked: randomReview.bookmarked,
            },
        });
        expect(bookmarkedStatus).toBe(201);
        expect(await bookmarkedJson().review.bookmarked).toEqual(randomReview.bookmarked);

        const { statusCode: viewedStatus, json: viewedJson } = await server.fastify.inject({
            method: 'PUT',
            url: '/reviews/1',
            ...userHeaders,
            payload: {
                viewed: randomReview.viewed,
            },
        });
        expect(viewedStatus).toBe(201);
        expect(await viewedJson().review.viewed).toEqual(randomReview.viewed);

        const { statusCode: likedStatus, json: likedJson } = await server.fastify.inject({
            method: 'PUT',
            url: '/reviews/1',
            ...userHeaders,
            payload: {
                liked: randomReview.liked,
            },
        });
        expect(likedStatus).toBe(201);
        expect(await likedJson().review.liked).toEqual(randomReview.liked);
    });
});
