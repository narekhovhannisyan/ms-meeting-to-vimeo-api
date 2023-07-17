import { FindOptions, FindOrCreateOptions } from 'sequelize'

import { RepositorioDefinition } from './definitions'

/**
 * Gets repositorio by meeting id.
 */
export const getRepoByMeetingId = (meetingId: string) => {
  const withCriteria: FindOptions = {
    where: {
      clave: meetingId
    },
    raw: true
  }

  return RepositorioDefinition.findOne(withCriteria)
}

/**
 * Inserts repository by given `meetingId`.
 */
export const insertRepoByMeetingId = (meetingId: string): Promise<any> => {
  const withCriteria: FindOrCreateOptions = {
    where: {
      nombre: meetingId,
      clave: meetingId,
      publico: 1,
      activo: 1,
      url: ''
    },
    raw: true
  }

  return RepositorioDefinition.findOrCreate(withCriteria)
}
