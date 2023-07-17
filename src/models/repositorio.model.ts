import { FindOrCreateOptions } from 'sequelize'

import { RepositorioDefinition } from './definitions'

/**
 * Inserts repository by given `meetingId`.
 */
export const insertRepoByMeetingId = (meetingId: string) => {
  const withCriteria: FindOrCreateOptions = {
    where: {
      nombre: meetingId,
      clave: meetingId,
      publico: 1,
      activo: 1
    },
    raw: true
  }

  return RepositorioDefinition.findOrCreate(withCriteria)
}
