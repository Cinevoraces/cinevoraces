export enum EReview {
    BOOKMARKED = 'bookmarked',
    VIEWED = 'viewed',
    LIKED = 'liked',
    RATING = 'rating',
    COMMENT = 'comment',
}

export enum EAddReview {
    BOOKMARKED = 'Film ajouté à ma liste.',
    VIEWED = 'Film marqué comme vu.',
    LIKED = 'Film marqué comme aimé.',
    RATING = 'Film noté.',
    COMMENT = 'Commentaire ajouté.',
}

export enum EUpdateReview {
    BOOKMARKED = 'Film retiré de ma liste.',
    VIEWED = 'Film marqué comme non vu.',
    LIKED = 'Film marqué comme non aimé.',
    RATING = 'Note mise à jour.',
    COMMENT = 'Commentaire mis à jour.',
}
