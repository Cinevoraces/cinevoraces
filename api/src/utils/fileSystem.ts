import fs from 'fs';
import { Readable } from 'stream';

export type Folder = 'root' | 'temp' | 'public';

/**
 * Get the full path of the folder
 */
export const getFolderPath = (folder: Folder) => {
    const root = process.cwd();
    const paths = {
        root: root,
        temp: `${root}/temp`,
        public: `${root}/public`,
    };
    return paths[folder];
};

/**
 * Save a file from a Readable stream or a Blob to disk
 */
export const saveFile = async (path: string, source: Readable | Blob): Promise<void> => {
    if (source instanceof Readable)
        return new Promise<void>((resolve, reject) => {
            const ws = fs.createWriteStream(path);
            source.pipe(ws);
            ws.on('error', reject);
            ws.on('finish', resolve);
            ws.on('close', resolve);
        });
    else if (source instanceof Blob) {
        const bytea = await source.arrayBuffer();
        return new Promise((resolve, reject) => {
            fs.writeFile(path, Buffer.from(bytea), error => (error ? reject(error) : resolve()));
        });
    }
};

/**
 * Delete a file from disk
 */
export const deleteFile = async (path: string): Promise<void> => await fs.promises.unlink(path);
