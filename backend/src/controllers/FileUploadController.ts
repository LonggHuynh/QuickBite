import { Request, Response, NextFunction } from "express";

import * as fileUploadService from "../services/FileUploadService";
import { CustomHttpError } from "../errors/CustomHttpError";

export const handleUpload = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  if (!req.file) {
    throw new CustomHttpError(400, "No file provided");
  }

  const fileBuffer = req.file.buffer;
  const fileName = req.file.originalname;
  const mimeType = req.file.mimetype;
  const imageUrl = await fileUploadService.uploadFile(
    fileBuffer,
    fileName,
    mimeType
  );

  res.status(200).json(imageUrl);
};
