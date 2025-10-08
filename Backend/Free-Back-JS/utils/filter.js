require('../config/global');

async function filterCodeData(req) {
    let { code , status , start_date , end_date } = req.body;
    try {
        let filterQuery = {}
        
        if (code) {
            filterQuery['code'] = code;
        }
        if (status) {
            filterQuery['status'] = status;
        }
        if (start_date && end_date) {
            const dateStart = new Date(`${start_date}T00:00:00.000+07:00`);
            const dateEnd = new Date(`${end_date}T23:59:59.000+07:00`);
            filterQuery['createdAt'] = {
                $gte: dateStart,
                $lte: dateEnd,
            };
        }
                
        return filterQuery;
    } catch (error) {
        logConsoleError(error);
    }
}

module.exports = { 
    filterCodeData,
}