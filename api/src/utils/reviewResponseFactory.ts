import type { Database } from '@src/types/Database';

type reviewKeys = keyof Pick<Database.review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>;

/**
 * **reviewResponseFactory**
 * @description Return a string depending on the review object key updated.
 * @param review Object containing only one of the following keys: *bookmarked, viewed, liked, rating, comment*.
 * @returns String
 */
export default function reviewResponseFactory(
  review: Partial<Database.review>,
  previousReview: Partial<Database.review>
): string {
  // Select the first key of the review object
  const keys = Object.keys(review)[0] as reviewKeys;
  const value = review[keys];
  const { comment, rating } = previousReview;

  switch (keys) {
    case 'bookmarked':
      if (value) {
        return 'Film ajouté à ma liste.';
      } else {
        return 'Film retiré de ma liste.';
      }
    case 'viewed':
      if (value) {
        return 'Film marqué comme vu.';
      } else {
        return 'Film marqué comme non vu.';
      } 
    case 'liked':
      if (value) {
        return 'Film marqué comme aimé.';
      } else {
        return 'Film marqué comme non aimé.';
      }
    case 'rating':
      if (rating) {
        return 'Note mise à jour.';
      } else {
        return 'Film noté.';
      }
    case 'comment':
      if (comment) {
        return 'Commentaire mis à jour.';
      } else {
        return 'Commentaire ajouté.';
      }
  }
}
