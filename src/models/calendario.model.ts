import { FindOptions, fn, col } from 'sequelize'

import { CalendarioDefinition } from './definitions'

/**
 * Get meetings from calendar.
 */
export const getMeetings = () => {
  const withCriteria: FindOptions = {
    attributes: [[fn('DISTINCT', col('meetingId')), 'meetingId']]
  }

  return CalendarioDefinition.findAll(withCriteria)
}
