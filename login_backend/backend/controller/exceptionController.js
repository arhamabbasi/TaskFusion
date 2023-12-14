const ExceptionLog = require('../models/exception');

async function handleException(res, error, functionName) {
  // Log the exception
  await ExceptionLog.create({
    functionName,
    message: error.message,
    stackTrace: error.stack,
  });

}

module.exports = { handleException };
