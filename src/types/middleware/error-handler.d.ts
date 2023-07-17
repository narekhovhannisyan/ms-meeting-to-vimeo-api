export interface ErrorCases {
  [key: string]: {
    statusCode: number,
    errorCode: string,
    errorMessage?: string
  }
}

export type MiddlewareError = ErrorConstructor & { message: string }
