import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { RequestWithFiles } from "../lib/types";
import FileService from "../services/file.service";

const fileRouter = express.Router();

const fileService = new FileService();

const upload = multer({
  fileFilter: function (req, file, callback) {
    if (
      ![
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain",
      ].includes(file.mimetype)
    ) {
      return callback(new Error("Invalid file format"));
    }
    callback(null, true);
  },
});

fileRouter.get(
  "/files",
  async (req: Request, res: Response, next: NextFunction) => {
    const pageToken = req.query.pageToken as string;
    const limit = +(req.query.limit ?? 4);
    try {
      const { files, nextPageToken } = await fileService.listFiles({
        nextPageToken: pageToken,
        limit,
      });
      res.status(200).send({ files, nextPageToken });
    } catch (e) {
      next(e);
    }
  }
);

fileRouter.post(
  "/files",
  upload.array("files"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fileService.uploadFiles((req as RequestWithFiles).files);
      res.status(200).send();
    } catch (e) {
      next(e);
    }
  }
);

fileRouter.get(
  "/files/:fileName/:shareableDuration/signed-url",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const signedUrl = await fileService.getSignedUrl(
        req.params.fileName,
        req.params.shareableDuration as unknown as number
      );
      res.send({ url: signedUrl });
    } catch (e) {
      next(e);
    }
  }
);

fileRouter.get(
  "/files/:fileName",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const downloadUrl = await fileService.downloadFile(req.params.fileName);
      res.send({ url: downloadUrl });
    } catch (e) {
      next(e);
    }
  }
);

export default fileRouter;
