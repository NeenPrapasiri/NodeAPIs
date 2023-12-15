const { errorHandler } = require('./error-controller')

function expressHandler ({ validator, handler }) {
  return async (request, response, next) => {
    try {
      const responseJson = await handler(request, response)
      if (responseJson.code >= 400) {
        throw responseJson;
      }
      response.json(responseJson)
    } catch (err) {
      errorHandler(err, response)
    }
  }
}

module.exports = {
  expressHandler
}