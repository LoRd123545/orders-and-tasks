import { AppError } from "./AppError.js";

class HttpError extends AppError {
  constructor(message: string, code: string, cause: any, isOperational: boolean) {
    super(message, code, cause, isOperational);
  }
}

export { HttpError }