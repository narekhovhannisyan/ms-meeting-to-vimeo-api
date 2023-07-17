import { Options, Sequelize } from 'sequelize'

import CONFIG from '../config'

import { ConnectionLogger } from '../utils/connection-logger.util'

const { DATABASE_URL, SERVICES } = CONFIG

const logger = ConnectionLogger(SERVICES.DB)

/**
 * Options for new Sequelize instance.
 */
const OPTIONS: Options = {
  logging: false,
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true
  }
}

export const SequelizeClient = new Sequelize(DATABASE_URL, OPTIONS)

/**
 * Sync db and models, authenticates to check connection status.
 */
SequelizeClient.sync()
SequelizeClient.authenticate(OPTIONS)
  .then(logger.logConnectionSuccess)
  .catch(logger.logConnectionFailure)
