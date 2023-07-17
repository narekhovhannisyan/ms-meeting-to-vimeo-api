declare module '@vimeo/vimeo'

type UploadFileParams = {
  filePath: string,
  name: string,
  description: string
}

type UpdateFileDescriptionParams = {
  uri: string,
  name: string,
  description: string
}

type UpdateDescriptionResponse = {
  statusCode: number
}
