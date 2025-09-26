const testService = require('../services/index')
const {responBuilderSuccess, responBuilderError,} = require('../utils/responBuilder')


async function testResponse(req, res) {
    try {
        const [success, response] = await testService.testResponse();
        if (success) {
            return responBuilderSuccess(response, res);
        } else {
            return responBuilderError(response, res);
        }
    } catch (error) {
        return responBuilderError(error, res);
    }
}

module.exports = { testResponse };
