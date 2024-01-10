import { NextFunction, Request, Response } from 'express'

import CONFIG from '../config'

import { ErrorCases, MiddlewareError } from '../types/middleware/error-handler'

const { RETRY_AFTER_HEADER } = CONFIG

/**
 * Error cases for error handling middleware.
 */
const ERROR_CASES: ErrorCases = {
  DatabaseQueryError: {
    statusCode: 400,
    errorCode: 'InvalidData'
  },
  InputValidationError: {
    statusCode: 400,
    errorCode: 'InvalidInput'
  },
  PathNotFoundError: {
    statusCode: 404,
    errorCode: 'NotFound'
  },
  ResourceNotFoundError: {
    statusCode: 404,
    errorCode: 'NotFound'
  },
  DEFAULT: {
    statusCode: 500,
    errorCode: 'InternalError',
    errorMessage: 'The server encountered an internal error. Try again later.'
  }
}

/**
 * Error handler middleware function.
 */
export const ErrorHandlerMiddleware = (error: MiddlewareError, request: Request, response: Response, next: NextFunction) => {
  const ERROR_CASE = ERROR_CASES[error.name] || ERROR_CASES.DEFAULT

  const errorResponse = {
    status: ERROR_CASE.statusCode,
    code: ERROR_CASE.errorCode,
    message: ERROR_CASE.errorMessage || error.message
  }

  // temp. log to explore and add more cases.
  if (errorResponse.status >= 400) {
    console.error(error)
  }

  if (errorResponse.status === 503) {
    response.setHeader('Retry-After', RETRY_AFTER_HEADER)
  }

  response.status(errorResponse.status).json(errorResponse)
}
