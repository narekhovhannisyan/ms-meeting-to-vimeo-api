import { Response } from 'express'

const HTTP_CODE_CONSTANTS = {
  SUCCESS_200: { STATUS: 200, MESSAGE: 'OK' },
  SUCCESS_201: { STATUS: 201, MESSAGE: 'Created' },
  SUCCESS_202: { STATUS: 202, MESSAGE: 'Accepted' },
  SUCCESS_204: { STATUS: 204, MESSAGE: 'No Content' }
}

type StatusCode = {
  STATUS: number,
  MESSAGE: string
}

/**
 * Sends response with given HTTP code constant.
 */
const _sendResponse = (res: Response, code: StatusCode, data?: any) => {
  const response = {
    status: code.STATUS,
    message: code.MESSAGE,
    ...data && { data }
  }

  res.status(response.status).json(response)
}

/**
 * Handles get method requests.
 */
export const handleGet = (response: Response) => (result: any) =>
  _sendResponse(response, HTTP_CODE_CONSTANTS.SUCCESS_200, result || null)

/**
 * Handles post method requests.
 */
export const handleAdd = (response: Response) => (result?: any) => {
  const { SUCCESS_201, SUCCESS_204 } = HTTP_CODE_CONSTANTS

  if (!result) {
    return _sendResponse(response, SUCCESS_204)
  }

  _sendResponse(response, SUCCESS_201, result)
}

/**
 * Handles put and patch method requests.
 */
export const handleUpdate = (response: Response) => (result?: any) => {
  const { SUCCESS_200, SUCCESS_204 } = HTTP_CODE_CONSTANTS

  if (!result) {
    return _sendResponse(response, SUCCESS_204)
  }

  _sendResponse(response, SUCCESS_200, result)
}

/**
 * Handles delete method requests.
 */
export const handleDelete = (response: Response) => () => {
  const { SUCCESS_204 } = HTTP_CODE_CONSTANTS

  _sendResponse(response, SUCCESS_204)
}
