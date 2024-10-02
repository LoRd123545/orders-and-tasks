import { AppError } from '@app/shared/errors/index.js'

type KnownError = {
  name: string,
  message: string,
  code: string,
}

type UnknownError = {
  name: string,
  code: 'UERR',
}

const getJsonError = (err: unknown): KnownError | UnknownError => {
  if (err instanceof AppError) {
    return {
      name: err.name,
      message: err.message,
      code: err.code,
    };
  }

  return {
    name: 'unknown error',
    code: 'UERR',
  }
}

export { getJsonError };