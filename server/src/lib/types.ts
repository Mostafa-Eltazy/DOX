import { Request } from 'express';

export interface RequestWithFiles extends Request {
  files: Express.Multer.File[];
}

export interface IFile {
  id: string;
  fileName: string;
  createdAt: Date;
  type: string;
  url: string;
  downloadCount: number | undefined;
}

export interface IDownloadCount {
  fileName: string;
  downloadCount: number;
}
