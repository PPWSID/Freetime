require("../../config/global");
const DashboardService = require("../../services/dashboard/dashboard");
const {responBuilderSuccess, responBuilderError,responBuilderSuccessV2,} = require('../../utils/responBuilder');
const { filterCodeData } = require('../../utils/filter');

const getFilter = async (req, res) => {
    try {
        const [success, response] = await DashboardService.getFilter();
        if (success) {
            return responBuilderSuccess(response, res);
        } else {
            return responBuilderError(response, res);
        }
    } catch (error) {
        return responBuilderError(error, res);
    }
}

const getDataDoughnutChart = async (req, res) => {
    try {
        const filterQuery = await filterCodeData(req);
        const [success, response] = await DashboardService.getDataDoughnutChart(filterQuery);
        if (success) {
            return responBuilderSuccess(response, res);
        } else {
            return responBuilderError(response, res);
        }
    } catch (error) {
        return responBuilderError(error, res);
    }
}
const getDataBarChart = async (req, res) => {
    try {
        const filterQuery = await filterCodeData(req);
        const [success, response] = await DashboardService.getDataBarChart(filterQuery);
        if (success) {
            return responBuilderSuccess(response, res);
        } else {
            return responBuilderError(response, res);
        }
    } catch (error) {
        return responBuilderError(error, res);
    }
}

const getDataTableList = async (req, res) => {
    try {
        const filterQuery = await filterCodeData(req);
        const [success, response] = await DashboardService.getDataTableList(filterQuery);
        
        if (success) {
            return responBuilderSuccess(response, res);
        } else {
            return responBuilderError(response, res);
        }
    } catch (error) {
        return responBuilderError(error, res);
    }
}

const getDataTable = async (req, res) => {
    try {
        let { skip, limit } = req.body;
        skip = skip ? skip : 0;
        limit = limit ? limit : 10;
        
        const filterQuery = await filterCodeData(req);
        const [success, response , respone2] = await DashboardService.getDataTable(filterQuery , skip , limit);
        if (success) {
            return responBuilderSuccessV2(response, respone2 ,res);
        } else {
            return responBuilderError(response, res);
        }
    } catch (error) {
        return responBuilderError(error, res);
    }
}

const generateRandomData = async (req, res) => {
    try {
        const [success, response] = await DashboardService.generateRandomData();
        if (success) {
            return responBuilderSuccess(response, res);
        } else {
            return responBuilderError(response, res);
        }
    } catch (error) {
        return responBuilderError(error, res);
    }
}

module.exports = {
    getFilter,
    getDataDoughnutChart,
    getDataBarChart,
    getDataTableList,
    getDataTable,
    generateRandomData,
}