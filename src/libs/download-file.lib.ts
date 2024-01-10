import fs from 'fs'

import CONFIG from '../config'

import { getFileFromGraphAPI } from './microsoft-graph-api.lib'

const { DOWNLOADS_PATH } = CONFIG

export const downloadFile = async (url: string, fileName: string) => {
  try {
    if (!fs.existsSync(DOWNLOADS_PATH)){
      fs.mkdirSync(DOWNLOADS_PATH)
    }

    return getFileFromGraphAPI(url, fileName)
  } catch (error) {
    console.error(error)
  }
}
