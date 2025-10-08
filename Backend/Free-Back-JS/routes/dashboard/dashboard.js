require('../../config/global');
const router = express.Router();

const DashBoardController = require('../../controllers/dashboard/dashboard');

router.get('/filter', DashBoardController.getFilter);
router.post('/doughnut', DashBoardController.getDataDoughnutChart);
router.post('/barchart', DashBoardController.getDataBarChart);
router.get('/tablelist', DashBoardController.getDataTableList);
router.post('/table', DashBoardController.getDataTable);

// gernerate random data
router.get('/generate', DashBoardController.generateRandomData);

module.exports = router;
