import { Response } from "express";

import { AppError, DatabaseError, HttpError, NotFoundError } from '@app/shared/errors/index.js';
import { httpCodes } from "@app/shared/index.js";

import { getJsonError } from "@app/utils/index.js";

class ErrorHandler {
  handle(err: any, responseStream: Response) {
    if (err instanceof AppError) {
      if (err instanceof HttpError) {
        return responseStream.status(parseInt(err.code)).json(getJsonError(err));
      }

      if (err instanceof NotFoundError) {
        return responseStream.status(httpCodes.NOT_FOUND).json(getJsonError(err));
      }

      responseStream.status(httpCodes.INTERNAL_SERVER_ERROR).json(getJsonError(new HttpError('Something went wrong', httpCodes.INTERNAL_SERVER_ERROR.toString(), err, true)));
    }
  }
}

const errorHandler = new ErrorHandler();

export {
  errorHandler
}