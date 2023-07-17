import { Vimeo } from '@vimeo/vimeo'

import CONFIG from '../config'

const { VIMEO } = CONFIG
const { ACCESS_TOKEN, CLIENT_ID, CLIENT_SECRET } = VIMEO

const client = new Vimeo(CLIENT_ID, CLIENT_SECRET, ACCESS_TOKEN)

/**
 * Error handler.
 */
const andHandleError = (error: Error) => console.error(error)

/**
 * Reports upload status.
 */
const progressCallback = (bytesUploaded: number, bytesTotal: number): void => {
  const percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
  console.log(bytesUploaded, bytesTotal, percentage + '%')
}

/**
 * Gets uploaded video link.
 */
const getVideoLink = async (uri: string): Promise<string> => {
  const metadata = await client.request(`${uri}?fields=link`)

  return metadata.body.link
}

/**
 * Update already existing video's name and description.
 */
const updateVideoNameAndDescription = (data: UpdateFileDescriptionParams): Promise<UpdateDescriptionResponse> => {
  const { uri, name, description } = data

  return client.request({
    method: 'PATCH',
    path: uri,
    params: {
      name,
      description
    }
  })
}

/**
 * Gets transcoding status for given `uri`.
 */
const getTranscodeStatus = (uri: string) => client.request(`${uri}?fields=transcode.status`)
  .then((response: any) => response.body.transcode.status)

/**
 * Upload file with given path.
 */
export const uploadVideo = async (params: UploadFileParams) => {
  try {
    const { filePath, name, description } = params
    console.log(`Uploading: ${filePath}`)

    const uri = await client.upload(
      filePath,
      {
        name,
        description
      },
      progressCallback
    )
    console.log(`Uploaded: ${filePath}`)

    const link = await getVideoLink(uri)
    console.log(`Link: ${link}`)

    await updateVideoNameAndDescription({
      uri,
      name,
      description
    })

    const transcodeStatus = await getTranscodeStatus(uri)
    console.log(`The transcode status for ${uri} is: ${transcodeStatus.body.transcode.status}`)
  } catch (error) {
    if (error instanceof Error) {
      andHandleError(error)
    }

    console.error(error)
  }
}
