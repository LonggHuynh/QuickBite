import { Request, Response, NextFunction } from "express";

import { CustomHttpError } from "../errors/CustomHttpError";
import logger from "../utils/logger";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err);
  if (err instanceof CustomHttpError) {
    res.status(err.statusCode).json({ msg: err.message });
  } else {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
