import { Request, Response } from 'express'

/**
 * Returns `OK` response for letting AWS know that server is alive.
 */
export const getStatus = (request: Request, response: Response) => {
  const okStatus = 'OK'

  response.send(okStatus)
}
