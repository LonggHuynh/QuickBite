import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * A higher-order function to wrap async route handlers and pass errors to Express error handlers.
 * @param fn - The async route handler function.
 * @returns A new function that wraps the original handler.
 */
export function asyncHandler(fn: RequestHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
