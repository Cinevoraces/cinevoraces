import type { MimeType } from './_index';

export interface fileManager {
  avatar: {
    url: string,
    path: string,
    mimetype: MimeType | null,
  },
};
