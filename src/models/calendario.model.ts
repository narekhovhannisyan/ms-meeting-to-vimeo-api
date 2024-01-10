import { FindOptions, fn, col } from 'sequelize'

import { CalendarioDefinition } from './definitions'

/**
 * Get meetings from calendar.
 */
export const getMeetings = (): Promise<any> => {
  const withCriteria: FindOptions = {
    attributes: [[fn('DISTINCT', col('meetingId')), 'meetingId']],
    raw: true
  }

  return CalendarioDefinition.findAll(withCriteria)
}
