require('../config/global');

async function responBuilderSuccess(data, res, statusCode = 200, status = "success") {
    let response = {
        status: status,
        data: data,
    };
    res.status(statusCode).json(response);  
}

async function responBuilderError(data, res, statusCode = 400, status = "fail", error) {
    let response = {
        status: status,
        data: data,
        error: error
    };
    res.status(statusCode).json(response);
}

async function responBuilderUnauthorized(res, statusCode = 401, status = "Unauthorized", error) {
    let response = {
        status: status,
        message: message,
        error: error
    };
    res.status(statusCode).json(response);
}

module.exports = { 
    responBuilderSuccess, 
    responBuilderError,
    responBuilderUnauthorized,
};  