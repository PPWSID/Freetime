require('../config/global');

async function logConsoleError(error) {
    
    let message = error.message;
    let code = error.code || "NO_CODE";
    let stackLines = error.stack.split("\n");
    let location = stackLines[1].trim();

    let msg = `${message} : ${code} : ${location}`;
    console.error(`${Colors.red}${msg}${Colors.reset}`);
    return msg;
}

module.exports = logConsoleError;