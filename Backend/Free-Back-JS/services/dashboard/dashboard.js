require('../../config/global')
const logConsoleError = require('../../utils/logConsole')
const codeModel = require('../../models/dashboard/code');
const { response } = require('express');

const getFilter = async () => {
    try {
        let codeData = await codeModel.distinct("code");
        const statusData = await codeModel.distinct("status");

        codeData.sort( (a, b) => a.localeCompare(b) );
        statusData.sort( (a, b) => a.localeCompare(b) );

        codeData.unshift("ทั้งหมด");
        statusData.unshift("ทั้งหมด");
           
        let response = {
            code: codeData,
            status: statusData
        }

        return [true, response]
    } catch (error) {
        const msg = logConsoleError(error);
        return [false, msg || "Internal Server Error"];
    }
}

const getDataDoughnutChart = async (filter) => {
    try {

        const data = await codeModel.aggregate([
            {
                $match : filter
            },
            {
                $group: {  
                    _id:  { 
                        code : "$code", 
                        // name : "$name"
                    },
                    count : { $sum: 1}
                }
            },
            {
                $project : {
                    _id : 0,
                    code : "$_id.code",
                    // name : "$_id.name",
                    count : 1,

                }
            }
        ])
        
        let response = data.sort((a, b) => b.count - a.count);
        return [true , response]
    } catch (error) {
        const msg = logConsoleError(error);
        return [false, msg || "Internal Server Error" ];

    }
}

const getDataBarChart = async (filter) => {
    try {
        const data = await codeModel.aggregate([
            {
                $match : filter
            },
            {
                $group: {
                    _id: { 
                        code: "$code", 
                        // name: "$name" 
                    },
                    total: { $sum: "$total" },
                }
            },
            {
                $project: {
                    _id: 0,
                    code: "$_id.code",
                    // name: "$_id.name",
                    total: 1,
                }
            }
        ])
        let response = data.sort((a, b) => a.code.localeCompare(b.code, "en", { sensitivity: "base" }));
        return [true, response]
    } catch (error) {
        const msg = logConsoleError(error);
        return [false, msg || "Internal Server Error"];

    }
}   

const getDataTableList = async (filter) => {
    try {
        const data = await codeModel.aggregate([
            {
                $match : filter
            },
            {
                $group : {
                    _id : { 
                        code : "$code", 
                        status : "$status"
                    },
                }
            },
            {
                $project : {
                    _id : 0,
                    code : "$_id.code",
                    status : "$_id.status",
                    text_show : { $concat : [ "$_id.code", " (", "$_id.status", ")" ] }
                }
            }
        ]);
        data.sort((a, b) => a.code.localeCompare(b.code, "en", { sensitivity: "base" }) );
        // console.log("response", response);
        
        data.unshift({ code: "ทั้งหมด", status: "ทั้งหมด", text_show: "ทั้งหมด" });
        return [true, data]
    } catch (error) {
        const msg = logConsoleError(error);   
        return [false, msg || "Internal Server Error"];

    }
}

const getDataTable = async (filter , skip , limit) => {
    try {
        
        const data = await codeModel.aggregate([
            {
                $match : filter
            },
            {
                $project: {
                    _id: 0,
                    code: "$code",
                    name: "$name",
                    status: "$status",
                    total: "$total",
                    createdAt: "$createdAt",
                    updatedAt: "$updatedAt",
                }
            },
            {
                $skip : skip
            },
            {
                $limit : limit
            }
        ]);

        const count = await codeModel.countDocuments(filter);

        return [true, data, count ]
    } catch (error) {
        const msg = logConsoleError(error);
        return [false, msg || "Internal Server Error"];

    }
}

const generateRandomData = async () => {
    try {
        
        const codes = [
            "Golang",
            "Node.js",
            "PHP",
            "React",
            "Vue"
        ];

        const status = [
            "inactive", 
            "active", 
            "used" , 
            "expired"
        ];

        for (let i = 50; i < 51; i++) {
            const randomCode = codes[Math.floor(Math.random() * codes.length)];
            const randomStatus = status[Math.floor(Math.random() * status.length)];
            const randomName = `Name ${i + 1} ${randomCode}`;
            const randomTotal = Math.floor(Math.random() * 1000) + 1;
            const randomTitle = `Title ${i + 1} ${randomCode}`;

            await codeModel.create({
                code: randomCode,
                name: randomName,
                status: randomStatus,
                total: randomTotal,
                title: randomTitle
            });
        }
        return [true, "Generate Data Complete"];

    } catch (error) {
        const msg = logConsoleError(error);
        return [false, msg || "Internal Server Error"];

    }
}

module.exports = {
    getFilter,
    getDataDoughnutChart,
    getDataBarChart,
    getDataTableList,
    getDataTable,
    generateRandomData,
};