exports.successResponse = (message, data) => {
    return { success: { status: true, message }, data };
}

exports.errorResponse = (message) => {
    return { success: { status: false, message } };
}

exports.operationResponse = (error, code, data, message) => {
    return { error, code, data, message };
}