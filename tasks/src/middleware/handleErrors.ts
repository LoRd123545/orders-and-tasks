import { Request, Response, NextFunction } from "express";
import { errorHandler } from '@app/shared/handlers/errorHandler.js';

const handleErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handle(err, res);
}

export {
  handleErrors
}