const ErrorResponse = require("../helper/errors/error-response");

function errorHandler(error, response) {
  const code = ErrorResponse.errorCode[error.name || ErrorResponse.errorName[500]];
  return response
    .status(code)
    .json({
      code,
      status: code,
      message: error.message,
      data: error.data,
      responseCode: error.responseCode,
      success: 0,
    });
};
module.exports = {
  errorHandler
}