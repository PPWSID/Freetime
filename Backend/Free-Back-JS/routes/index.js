require('../config/global');
const testController = require('../controllers/index');

const router = express.Router();

router.get('/', testController.testResponse);


module.exports = router;
