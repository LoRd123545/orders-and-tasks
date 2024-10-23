import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

import { httpCodes } from '@app/shared/index.js';
import { HttpError } from '@app/shared/errors/index.js';

const validateBySchema = (schema: ZodSchema, whatToValidate: keyof Request) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req[whatToValidate]);

      if (!result.success) {
        throw new HttpError(
          result.error.message,
          httpCodes.BAD_REQUEST,
          result.error,
          true
        );
      }
    } catch (err) {
      next(err);
    }

    return next();
  };
};

export { validateBySchema };
