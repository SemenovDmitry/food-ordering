type IBuildFormErrorParams = {
  message: string
}

const buildFormError = ({ message }: IBuildFormErrorParams) => {
  return {
    formErrors: [message],
    fieldErrors: {},
  }
}

export default buildFormError
