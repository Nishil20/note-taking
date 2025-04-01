import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Wraps controller functions to handle TypeScript return type issues with Express.
 * Express expects route handlers to either return void or Promise<void>,
 * but our controllers return Response objects.
 * 
 * @param fn The controller function to wrap
 * @returns A properly typed RequestHandler function
 */
export const wrapAsync = (
  fn: (req: Request, res: Response, next?: NextFunction) => any
): RequestHandler => {
  return function(req: Request, res: Response, next: NextFunction): void {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}; 