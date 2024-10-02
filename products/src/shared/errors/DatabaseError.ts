import { AppError } from "./AppError.js";

class DatabaseError extends AppError {
  constructor(message: string, code: string, cause: any, isOperational: boolean) {
    super(message, code, cause, isOperational);
  }
}

export { DatabaseError }