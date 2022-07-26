 function defaultError (code, text) {
    const newError = {
      status: code,
      message: text
    }
    return newError
  }

  exports.defaultError = defaultError