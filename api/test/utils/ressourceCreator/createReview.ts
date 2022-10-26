// import type { review, Prisma } from '@prisma/client';
// import { createRessource } from './createRessource';

// export default async function createReview (userId: number, movieId: number, params?: Partial<Prisma.reviewCreateInput>) {
//   const fakeReview: Prisma.reviewCreateInput = {
//     bookmarked: false,
//     viewed: false,
//     liked: false,
//     rating: null,
//     comment: null,
//     created_at: new Date(),
//     updated_at: null,
//     user: { connect: { id: userId } },
//     movie: { connect: { id: movieId } },
//     ...params
//   };
  
//   const data = await createRessource<review, Prisma.reviewCreateInput, Prisma.reviewUpdateInput>(fakeReview, 'review');

//   return data;
// }
