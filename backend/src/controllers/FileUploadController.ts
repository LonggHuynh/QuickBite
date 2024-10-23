import { Request, Response, NextFunction } from 'express';

import * as fileUploadService from '../services/FileUploadService';

export const handleUpload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!req.file) {
        res.status(400).json({ error: 'No file provided' });
        return;
    }

    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const mimeType = req.file.mimetype;
    const imageUrl = await fileUploadService.uploadFile(fileBuffer, fileName, mimeType);

    res.status(200).json(imageUrl);
};