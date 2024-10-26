import { Router } from 'express';
import multer from 'multer';

import * as fileUploadController from '../controllers/FileUploadController';
import { asyncHandler } from '../asyncHandler';

const router = Router();
const upload = multer(); // To handle `multipart/form-data` requests

router.post('/', upload.single('file'), asyncHandler(fileUploadController.handleUpload));

export default router;
