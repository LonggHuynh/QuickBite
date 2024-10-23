import { Router } from 'express';
import multer from 'multer';
import { handleUpload } from '../controllers/FileUploadController';

const router = Router();
const upload = multer(); // To handle `multipart/form-data` requests

router.post('/', upload.single('file'), handleUpload);

export default router;
