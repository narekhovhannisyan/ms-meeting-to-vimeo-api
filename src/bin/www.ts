import { path } from 'app-root-path'
import { config } from 'dotenv'
import { createServer } from 'http'

/**
 * Read env variables from .env file.
 */
config({ path: `${path}/.env` })

import Application from '../app'

import { ProcessVariablesChecker } from '../utils/process-env-checker.util'

import CONFIG from '../config'

const { app } = Application

const { PORT } = CONFIG

/**
 * Check if all process environment variables are present for production mode.
 */
ProcessVariablesChecker()

type HttpServerError = {
  syscall: string,
  code: string
}

/**
 * Event listener for HTTP server `error` event.
 */
const onError = (error: HttpServerError) => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string'
    ? `Pipe ${PORT}`
    : `Port ${PORT}`

  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`)
      process.exit(1)
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`)
      process.exit(1)
    default:
      throw error
  }
}

const server = createServer(app)

/**
 * Gets port from environment and storest in Express.
 */
app.set('port', PORT)

/**
 * Event listener for HTTP server `listening` event.
 */
const onListening = () => {
  const address = server.address()
  const bind = typeof address === 'string'
    ? `pipe: ${address}`
    : `port: ${address && address.port}`
  console.log('\n', `Listening on ${bind}`, '\n')
}

server.listen(PORT)
server.on('error', onError)
server.on('listening', onListening)
