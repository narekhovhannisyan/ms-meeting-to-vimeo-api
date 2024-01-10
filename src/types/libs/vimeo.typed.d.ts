export type UploadFileParams = {
  filePath: string,
  name: string,
  description: string
}

export type UpdateFileDescriptionParams = {
  uri: string,
  name: string,
  description: string
}

export type UpdateDescriptionResponse = {
  statusCode: number
}
