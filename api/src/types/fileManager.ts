import type { MimeType } from './_index';
import type fs from 'fs';
import type pump from 'pump';
import type { BusboyFileStream } from '@fastify/busboy';

export interface fileManager {
  file: {
    url: string,
    path: string,
    mimetype: MimeType | null,
    fileName: string,
    file: BusboyFileStream,
  },
  pump: typeof pump,
  fs: typeof fs,
};
