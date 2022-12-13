export enum EReviewTypes {
  BOOKMARKED = 'bookmarked',
  VIEWED = 'viewed',
  LIKED = 'liked',
  RATING = 'rating',
  COMMENT = 'comment'
}

export const EReviewTypesKeys = {
  [EReviewTypes.BOOKMARKED]: {
    add: 'Film ajouté à ma liste.',
    update: 'Film retiré de ma liste.'
  },
  [EReviewTypes.VIEWED]: {
    add: 'Film marqué comme vu.',
    update: 'Film marqué comme non vu.'
  },
  [EReviewTypes.LIKED]: {
    add: 'Film marqué comme aimé.',
    update: 'Film marqué comme non aimé.'
  },
  [EReviewTypes.RATING]: {
    add: 'Film noté.',
    update: 'Note mise à jour.'
  },
  [EReviewTypes.COMMENT]: {
    add: 'Commentaire ajouté.',
    update: 'Commentaire mis à jour.'
  }
};
