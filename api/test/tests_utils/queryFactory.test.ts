import queryFactory from '@src/utils/queryFactory';
import { queryBuilder } from '@src/utils/queryFactory';

describe('queryFactory', () => {
  test('Test - queryBuilder.where()', () => {
    const case_1 = queryFactory({ filter: { movie_id: 1, user_id: 1 } }, 'review');
    const case_2 = queryFactory({ filter: { user_id: 1 } }, 'review');
    const case_3 = queryFactory({}, 'review');
    expect(case_1).toEqual(expect.objectContaining({ where: 'WHERE movie_id=1 AND user_id=1' }));
    expect(case_2).toEqual(expect.objectContaining({ where: 'WHERE user_id=1' }));
    expect(case_3).toEqual(expect.objectContaining({ where: '' }));
  });

  test('Test - SQL', async () => {
    // const testBuilder = queryBuilder.join(
    //   ['movies', 'reviews'],
    //   { movies: true },
    //   'joinFromUser' 
    // );
    // console.log('testBuilder', testBuilder);

    // const select = Prisma.sql`
    //   u.id,u.pseudo,u.mail,u.avatar_url,u.role,u.created_at,u.updated_at
    // `;

    // const SQLTest = await prisma.$queryRaw`
    //   SELECT ${select}, (
    //     SELECT json_agg(json_build_object('id', m.id, 'french_title', m.french_title, 'user_id', m.user_id))
    //     AS movies
    //   ) FROM "user" u 
    //   INNER JOIN movie m 
    //     ON u.id = m.user_id
    //   WHERE u.id = 2
    //   GROUP BY u.id
    //   ;
    // `;
  });
});
