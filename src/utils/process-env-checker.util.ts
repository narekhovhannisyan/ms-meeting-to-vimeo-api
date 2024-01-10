import { ERRORS } from './errors.util'

import CONFIG from '../config'

const { ProcessEnvVariableError } = ERRORS

const { REQUIRED_VARIABLES } = CONFIG

/**
 * @private
 * If required variable is missing, then throws error.
 */
const variableThrowErrorIfMissing = (variable: string) => {
  if (!process.env[variable]) {
    throw new ProcessEnvVariableError(`Missing '${variable}' required environment variable.`)
  }
}

/**
 * Check process variables for `production` mode.
 */
export const ProcessVariablesChecker = () => {
  if (process.env.MODE === 'production') {
    REQUIRED_VARIABLES.forEach(variableThrowErrorIfMissing)
  }
}
