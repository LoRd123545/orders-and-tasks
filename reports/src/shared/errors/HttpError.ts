import { AppError } from './AppError.js';

class HttpError extends AppError {
  constructor(
    message: string,
    code: number,
    cause: any,
    isOperational: boolean
  ) {
    super(message, code.toString(), cause, isOperational);
  }
}

export { HttpError };
