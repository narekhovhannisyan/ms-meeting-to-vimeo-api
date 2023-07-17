import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import ApiHealth from './api/health'

import {
  ErrorHandlerMiddleware,
  CommonMiddleware
} from './middleware'

/**
 * Init application.
 */
const app = express()

/**
 * Middleware - cors.
 */
app.use(CommonMiddleware.corsMiddleware)

/**
 * Middleware - setup a logger.
 */
app.use(morgan('dev'))

/**
 * Disable `x-powered-by` header.
 */
app.disable('x-powered-by')

/**
 * Middleware - body parser:
 * Parses the text as URL encoded data (limit 5 mb).
 * Parses the text as JSON & exposes the resulting object on req.body (limit 5 mb).
 */
app.use(express.urlencoded({ limit: '5mb', extended: false }))
app.use(express.json({ limit: '5mb' }))

/**
 * Middleware - Helmet:
 * Helps to secure app by setting HTTP headers.
 */
app.use(helmet())

/**
 * Initialize API Health endpoint.
 */
app.use('/health', ApiHealth)

/**
 * Handle favicon request.
 */
app.get('/favicon.ico', CommonMiddleware.faviconMiddleware)

/**
 * Middleware - catch 404 and forward to error handler.
 */
app.use(CommonMiddleware.pathNotFoundMiddleware)

/**
 * Middleware for catching errors and forwarding to error handler.
 */
app.use(ErrorHandlerMiddleware)

export default { app }
