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
    console.log('Meetings fetched.')

    for (const meeting of meetings) {
      const meetingId = meeting.meetingId
      const ifExist = await RepositorioModel.getRepoByMeetingId(meetingId)

      if (!ifExist) {
        console.log('Repository check passed.')
        const repository = await RepositorioModel.insertRepoByMeetingId(meetingId)
        const recordings = await getAllCallRecordings()
        console.log('Got call recordings.')
        const callRecordingData = recordings?.find((recording) => recording.meetingCode === meetingId)

        if (callRecordingData) {
          console.log('Download file flow.')
          const { callRecordingUrl, callRecordingDisplayName } = callRecordingData

          const filePath = `${path}/downloads/${callRecordingDisplayName}`

          await downloadFile(callRecordingUrl, filePath)

          console.log('Uploading file.')
          const urlVideo = await uploadVideo({
            filePath,
            name: callRecordingDisplayName,
            description: callRecordingDisplayName
          })

          console.log('Uploaded file.')
          await TemaSubtemaModel.crateTemaRecord({
            urlVideo,
            nombre: callRecordingDisplayName,
            idRepositorio: repository.idRepositorio
          })
        }
      }
    }

    handleGet(response)('OK')
  } catch (error) {
    next(error)
  }
}
