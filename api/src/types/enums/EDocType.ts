export enum EDocType {
    AVATAR,
    POSTER,
}

export const docTypes = {
    avatar: EDocType.AVATAR,
    poster: EDocType.POSTER,
} as Record<string, EDocType>;
