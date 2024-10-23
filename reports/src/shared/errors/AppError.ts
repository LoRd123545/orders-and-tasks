class AppError extends Error {
  code: string;
  isOperational: boolean;

  constructor(
    message: string,
    code: string,
    cause: any,
    isOperational: boolean
  ) {
    super(message);

    this.cause = cause;
    this.code = code;
    this.isOperational = isOperational;
  }
}

export { AppError };
