import { NextFunction, Request, Response } from 'express'

import { CalendarioModel, RepositorioModel } from '../../../models'
import { handleGet } from '../../../utils/response-handler.util'

export const executeStrategy = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const meetings = await CalendarioModel.getMeetings()

    for (const meeting of meetings) {
      const meetingId = meeting.getDataValue('meetingid')
      const ifExist = await RepositorioModel.insertRepoByMeetingId(meetingId)

      if (!ifExist) {

      }
    }

    handleGet(response)('ok')
  } catch (error) {
    next(error)
  }
}
