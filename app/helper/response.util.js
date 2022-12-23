exports.successResponse = (message, data) => ({ success: { status: true, message }, data });

exports.errorResponse = (message) => ({ success: { status: false, message } });

exports.operationResponse = (error, code, data, message) => ({
  error, code, data, message,
});
