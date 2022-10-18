import type { review } from '@prisma/client';

type reviewKeys = keyof Pick<review, 'bookmarked' | 'viewed' | 'liked' | 'rating' | 'comment'>;

export default function reviewResponseFactory(
  review: review,
  previousReview: Partial<review>
): string {
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
