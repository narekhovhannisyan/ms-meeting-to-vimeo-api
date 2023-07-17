interface CustomErrors {
  'DatabaseQueryError': ErrorConstructor
  'InputValidationError': ErrorConstructor
  'PathNotFoundError': ErrorConstructor
  'ProcessEnvVariableError': ErrorConstructor
  'ResourceNotFoundError': ErrorConstructor
}

const CUSTOM_ERRORS = [
  'DatabaseQueryError',
  'InputValidationError',
  'PathNotFoundError',
  'ProcessEnvVariableError',
  'ResourceNotFoundError'
]

export const ERRORS = CUSTOM_ERRORS.reduce((acc, className) => {
  acc = {
    ...acc,
    [className]: class extends Error {
      constructor (message: string) {
        super(message)
        this.name = this.constructor.name
      }
    }
  }

  return acc
}, {}) as CustomErrors
