import { NextFunction, Request, Response } from 'express'

import { CalendarioModel, RepositorioModel, TemaSubtemaModel } from '../../../models'

import { getAllCallRecordings } from '../../../libs/microsoft-graph-api.lib'
import { downloadFile } from '../../../libs/download-file.lib'
import { uploadVideo } from '../../../libs/vimeo.lib'

import { handleGet } from '../../../utils/response-handler.util'

import CONFIG from '../../../config'

const { FILE_PATH } = CONFIG

export const executeStrategy = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const meetings = await CalendarioModel.getMeetings()
    console.log('Meetings fetched.')
    console.log(meetings)

    for (const meeting of meetings) {
      const meetingId = meeting.meetingId
      const ifExist = await RepositorioModel.getRepoByMeetingId(meetingId)

      console.log(ifExist)

      if (!ifExist) {
        console.log('Repository check passed.')
        const repository = await RepositorioModel.insertRepoByMeetingId(meetingId)
        const recordings = await getAllCallRecordings()
        console.log('Got call recordings.')

        // recordings[0].meetingCode = meetingId // FOR TESTING BEFORE AZURE FIX
        const callRecordingData = recordings?.find((recording) => recording.meetingCode === meetingId)

        if (callRecordingData) {
          console.log('Download file flow.')
          const { callRecordingUrl, callRecordingDisplayName } = callRecordingData

          const response = await downloadFile(callRecordingUrl, callRecordingDisplayName)

          if (!response) {
            return
          }

          console.log('Uploading file.')
          const urlVideo = await uploadVideo({
            filePath: FILE_PATH(callRecordingDisplayName),
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
