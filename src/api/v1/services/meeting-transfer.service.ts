import { NextFunction, Request, Response } from 'express'
import { path } from 'app-root-path'

import { CalendarioModel, RepositorioModel, TemaSubtemaModel } from '../../../models'

import { getAllCallRecordings } from '../../../libs/microsoft-graph-api.lib'
import { downloadFile } from '../../../libs/download-file.lib'
import { uploadVideo } from '../../../libs/vimeo.lib'

import { handleGet } from '../../../utils/response-handler.util'

export const executeStrategy = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const meetings = await CalendarioModel.getMeetings()

    for (const meeting of meetings) {
      const meetingId = meeting.getDataValue('meetingid')
      const ifExist = await RepositorioModel.getRepoByMeetingId(meetingId)

      if (!ifExist) {
        const repository = await RepositorioModel.insertRepoByMeetingId(meetingId)
        const recordings = await getAllCallRecordings()
        const { callRecordingUrl, callRecordingDisplayName } = recordings?.find((recording) => recording.callId === meetingId)

        const filePath = `${path}/downloads/${callRecordingDisplayName}`

        await downloadFile(callRecordingUrl, filePath)

        const urlVideo = await uploadVideo({
          filePath,
          name: callRecordingDisplayName,
          description: callRecordingDisplayName
        })

        await TemaSubtemaModel.crateTemaRecord({
          urlVideo,
          nombre: callRecordingDisplayName,
          idRepositorio: repository.idRepositorio
        })
      }
    }

    handleGet(response)('ok')
  } catch (error) {
    next(error)
  }
}
