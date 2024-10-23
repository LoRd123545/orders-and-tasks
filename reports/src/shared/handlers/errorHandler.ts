import { Response } from 'express';

import { AppError, HttpError } from '@app/shared/errors/index.js';
import { httpCodes } from '@app/shared/index.js';

import { getJsonError } from '@app/utils/index.js';

class ErrorHandler {
  handle(err: any, responseStream: Response) {
    this.log(err);
    if (err instanceof AppError) {
      if (err instanceof HttpError) {
        return responseStream
          .status(parseInt(err.code))
          .json(getJsonError(err));
      }

      return responseStream
        .status(httpCodes.INTERNAL_SERVER_ERROR)
        .json(
          getJsonError(
            new HttpError(
              'Something went wrong',
              httpCodes.INTERNAL_SERVER_ERROR,
              err,
              true
            )
          )
        );
    }

    return responseStream
      .status(httpCodes.INTERNAL_SERVER_ERROR)
      .json(
        getJsonError(
          new HttpError(
            'Something went wrong',
            httpCodes.INTERNAL_SERVER_ERROR,
            err,
            true
          )
        )
      );
  }

  log(err: Error) {
    console.error(err);
  }
}

const errorHandler = new ErrorHandler();

export { errorHandler };
