 function defaultError (status, text) {
    const newError = {
      code: status,
      message: text
    }
    return newError
  }

  exports.defaultError = defaultError