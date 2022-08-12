import { IFile } from '../lib/types';
import { CloudStorage, ICloudStorage } from './cloud-storage.service';

class FileService {
  constructor(private storageClient: ICloudStorage = new CloudStorage()) {}

  public async uploadFiles(files: Express.Multer.File[]) {
    await Promise.all(files.map(f => this.storageClient.uploadFile(f)));
  }

  public async listFiles({
    nextPageToken,
    limit,
  }: {
    nextPageToken: string | undefined;
    limit: number;
  }): Promise<{ files: IFile[]; nextPageToken: string | undefined }> {
    return this.storageClient.listFiles({ nextPageToken, limit });
  }

  public async getSignedUrl(fileName: string, shareableDuration: number): Promise<string> {
    return this.storageClient.getSignedUrl(fileName, shareableDuration);
  }

  public async downloadFile(fileName: string): Promise<string> {
    return this.storageClient.getDownloadUrl(fileName, { expiryTtlMs: 1000 * 60 * 15 });
  }
}

export default FileService;
