import { getFolderPath, saveFile, type Folder } from '@src/utils';

export default class HTTPClient {
    public async downloadFile(
        url: string,
        file: { filename: string; destination: Folder },
        retryCount = 0,
    ): Promise<{ blob: Blob; contentType: string; path?: string }> {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            const contentType = res.headers.get('content-type');

            const path = `${getFolderPath(file.destination)}/${file.filename}.${contentType.split('/')[1]}`;
            await saveFile(path, blob);

            return { blob, contentType, path };
        } catch (err) {
            if (retryCount < 3) return this.downloadFile(url, file, retryCount + 1);
            else throw err;
        }
    }
}
