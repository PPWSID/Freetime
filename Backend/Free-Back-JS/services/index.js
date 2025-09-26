require('../config/global')
const logConsoleError = require('../utils/logConsole')

const testResponse = async () => {
    try {

        let response = "Welcome to Free Time API"
        return [true , response]
    } catch (error) {
        const msg = logConsoleError(error);
        return [false, msg || "Internal Server Error" ];

    }
}

module.exports = {
    testResponse
};