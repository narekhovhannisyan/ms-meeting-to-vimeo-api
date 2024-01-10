import cors from 'cors'
import { Request, Response, NextFunction } from 'express'

import { ERRORS } from '../utils/errors.util'

import STRINGS from '../config/strings'

const { PathNotFoundError } = ERRORS
const { RESOURCE_DOESNT_EXIST } = STRINGS

/**
 * Cors middleware.
 */
export const corsMiddleware = cors({
  origin: '*', // TODO: modify this for future needs
  credentials: true,
  exposedHeaders: ['set-cookie'],
  optionsSuccessStatus: 200
})

/**
 * Send `204` response for serving favicon.
 */
export const faviconMiddleware = (request: Request, response: Response) => response.status(204)

/**
 * Passes `PathNotFound` error to next handler.
 */
export const pathNotFoundMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const { url } = request

  next(new PathNotFoundError(RESOURCE_DOESNT_EXIST(url)))
}
