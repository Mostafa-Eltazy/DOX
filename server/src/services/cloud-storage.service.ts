import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { FieldValue, Firestore, getFirestore } from "firebase-admin/firestore";
import uuid from "short-uuid";
import serviceAccount from "../../firebaseServiceAccount.json";
import { IDownloadCount, IFile } from "../lib/types";
import { Bucket, File } from "@google-cloud/storage";

// 12 hours
const DEFAULT_EXPIRY_TTL_MS = 1000 * 60 * 60 * 60;

export interface ICloudStorage {
  uploadFile: (file: Express.Multer.File) => Promise<void>;
  listFiles: ({
    nextPageToken,
    limit,
  }: {
    nextPageToken: string | undefined;
    limit: number;
  }) => Promise<{ files: IFile[]; nextPageToken: string | undefined }>;
  getSignedUrl: (
    fileName: string,
    shareableDuration: number
  ) => Promise<string>;
  getDownloadUrl: (
    fileName: string,
    opts?: { expiryTtlMs?: number }
  ) => Promise<string>;
}

export class CloudStorage implements ICloudStorage {
  private readonly bucket: Bucket;
  private readonly db: Firestore;

  constructor() {
    initializeApp({
      credential: cert(serviceAccount as Record<string, any>),
      storageBucket: "dox-filehosting-app.appspot.com",
    });

    this.bucket = getStorage().bucket();
    this.db = getFirestore();
  }

  public async uploadFile(file: Express.Multer.File) {
    const uploadableFile = this.bucket.file(file.originalname);
    return uploadableFile.save(file.buffer, {
      contentType: file.mimetype,
      predefinedAcl: "publicRead",
      metadata: { firebaseStorageDownloadTokens: uuid.generate() },
    });
  }

  public async listFiles({
    nextPageToken,
    limit,
  }: {
    nextPageToken: string | undefined;
    limit: number;
  }): Promise<{ files: IFile[]; nextPageToken: string | undefined }> {
    const [files, nextPageQuery] = await this.bucket.getFiles({
      autoPaginate: false,
      maxResults: limit,
      pageToken: nextPageToken,
    });
    const downloadCounts = await this.getDownloadCounts(files);

    return {
      files: files.map((f) => ({
        id: f.metadata.id,
        fileName: f.metadata.name,
        createdAt: f.metadata.timeCreated,
        type: f.metadata.contentType,
        url: f.metadata.mediaLink,
        downloadCount: downloadCounts.find(
          (dc) => dc.fileName === f.metadata.name
        )?.downloadCount,
      })),
      nextPageToken: (nextPageQuery as Record<string, string>)?.pageToken,
    };
  }

  public async getSignedUrl(
    fileName: string,
    shareableDuration: number
  ): Promise<string> {
    let shareableDurationNumber: number = +shareableDuration;
    const sharableFile = this.bucket.file(fileName);
    const signedUrlResponse = await sharableFile.getSignedUrl({
      action: "read",
      expires: new Date(
        new Date().getTime() +
          (shareableDurationNumber ?? DEFAULT_EXPIRY_TTL_MS)
      ),
    });

    return signedUrlResponse[0];
  }

  public async getDownloadUrl(
    fileName: string,
    opts: { expiryTtlMs?: number } = {}
  ): Promise<string> {
    const sharableFile = this.bucket.file(fileName);

    const downloadUrlResponse = await sharableFile.getSignedUrl({
      action: "read",
      expires: new Date(
        new Date().getTime() + (opts?.expiryTtlMs ?? DEFAULT_EXPIRY_TTL_MS)
      ),
      responseDisposition: "attachment",
    });

    await this.incrementDownloadCount(fileName);

    return downloadUrlResponse[0];
  }

  private async incrementDownloadCount(fileName: string): Promise<void> {
    const fileRef = this.db.collection("files").doc(fileName);
    await fileRef.set(
      {
        fileName,
        downloadCount: FieldValue.increment(1),
      },
      { merge: true }
    );
  }

  private async getDownloadCounts(files: File[]): Promise<IDownloadCount[]> {
    const fileNames = files.map((f) => f.metadata.name);
    const downloadCountsQuery = await this.db
      .collection("files")
      .where("fileName", "in", fileNames)
      .get();
    return downloadCountsQuery.docs.map((dc) => dc.data()) as IDownloadCount[];
  }
}
