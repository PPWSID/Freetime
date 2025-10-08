require('../config/global');

async function responBuilderSuccess(data, res, statusCode = 200, status = "Success") {
    
    let response = {
        status: status,
        data: data,
    };
    res.status(statusCode).json(response);  
}

function buildErrorMessage(error) {
    let errMsg = "";
    let code = "NO_CODE";
    let location = "NO_STACK";

    if (error instanceof Error) {
        // ถ้าเป็น Error object ปกติ
        errMsg = error.message || "Unknown error";
        code = error.code || "NO_CODE";

        if (error.stack) {
            let stackLines = error.stack.split("\n");
            if (stackLines.length > 1) {
                location = stackLines[1].trim();
            }
        }
    } else if (typeof error === "string") {
        // กรณี throw string ตรง ๆ
        errMsg = error;
    } else if (error && typeof error.then === "function") {
        // กรณี Promise หลุดมา
        errMsg = "Unexpected Promise error";
    } else {
        // กรณีอื่น ๆ เช่น object ธรรมดา
        try {
            errMsg = JSON.stringify(error);
        } catch (e) {
            errMsg = String(error);
        }
    }

    return `${errMsg} : ${code} : ${location}`;
}


async function responBuilderError(error, res, statusCode = 400, status = "Fail") {

    let msg = buildErrorMessage(error);

    let response = {
        status: status,
        error: msg
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

async function responBuilderSuccessV2(data, count , res, statusCode = 200, status = "Success") {
     let response = {
        status: status,
        data: data,
        count: count
    };
    res.status(statusCode).json(response);  
}

module.exports = { 
    responBuilderSuccess, 
    responBuilderError,
    responBuilderUnauthorized,
    responBuilderSuccessV2,
};  