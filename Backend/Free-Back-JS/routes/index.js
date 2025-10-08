require('../config/global');
const router = express.Router();
const testController = require('../controllers/index');



router.get('/', testController.testResponse);


module.exports = router;
