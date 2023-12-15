const ErrorResponse = require('./errors/error-response');

function success(body = {}, respMessage = 'Success', app = false) {
  var payload = {
    success: 1,
    code: 200,
    message: respMessage,
    data: body
  }

  return payload
}

function failure(statusCode = 500, body = null, respMessage = 'Error', respCode = 'E99', app = false) {
  return {
    code: statusCode,
    name: ErrorResponse.errorName[statusCode],
    responseCode: respCode,
    message: respMessage,
    data: body,
  };
}

module.exports = {
  success,
  failure
}