/**
 * Logger class with constructs logger based on given `serviceName`.
 */
export const ConnectionLogger = (serviceName: string) => {
  const logConnectionSuccess = () => console.log(`${serviceName} connection has been established successfully.`)
  const logConnectionFailure = (error: Error) => console.error(`${serviceName} connection error: ${error.message}`)

  return {
    logConnectionSuccess,
    logConnectionFailure
  }
}
