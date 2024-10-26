import { UserClaims } from '../models/UserClaims';

declare global {
  namespace Express {
    interface Request {
      user?: UserClaims;
    }
  }
}
