import { Router } from 'express';

import * as authController from '../controllers/AuthController';
import { asyncHandler } from '../asyncHandler';

const router = Router();


router.post('/signup', asyncHandler(authController.signUp));
router.post('/login', asyncHandler(authController.login));

export default router;
