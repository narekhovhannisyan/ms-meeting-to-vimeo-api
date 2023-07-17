import { FindOptions } from 'sequelize'
import { CalendarioDefinition } from './definitions'

/**
 * Get meetings from calendar.
 */
export const getMeetings = () => {
  const withCriteria: FindOptions = {
    attributes: ['meetingId', 'name', 'date'],
    raw: true
  }

  return CalendarioDefinition.findAll(withCriteria)
}
