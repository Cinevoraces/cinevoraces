export const Review = {
    $id: 'Review',
    type: 'object',
    properties: {
        movie_id: { type: 'number' },
        author_id: { type: 'number' },
        author_pseudo: { type: 'string' },
        author_mail: { type: 'string' },
        author_role: { type: 'string' },
        member_since: { type: 'number' },
        comment: { type: 'string' },
        movie: {
            type: 'object',
            properties: {
                french_title: { type: 'string' },
                original_title: { type: 'string' },
                document_group_id: { type: 'number' },
                publishing_date: { type: 'string' },
                season_id: { type: 'number' },
            },
        },
    },
    required: ['author_id', 'author_pseudo', 'author_mail', 'author_role', 'member_since', 'comment', 'movie'],
};
