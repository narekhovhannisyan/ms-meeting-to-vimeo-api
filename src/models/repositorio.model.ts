import { FindOptions } from 'sequelize'
import { RepositorioDefinition } from './definitions'

/**
 * Gets repository by given `meetingId`.
 */
export const getRepoByMeetingId = (meetingId: string) => {
  const withCriteria: FindOptions = {
    where: {
      meetingId,
      raw: true
    }
  }

  return RepositorioDefinition.findOne(withCriteria)
}
