import { TemaSubtemaDefinition } from './definitions'

type CreateTemaRecordParams = {
  urlVideo: string
  nombre: string,
  idRepositorio: number
}

/**
 * Creates new tema record.
 */
export const crateTemaRecord = (params: CreateTemaRecordParams) => {
  const { urlVideo, nombre, idRepositorio } = params
  const withCriteria = {
    urlVideo,
    nombre,
    idRepositorio
  }

  return TemaSubtemaDefinition.create(withCriteria)
}
