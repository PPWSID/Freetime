require('./config/global');


//----------- Require Router -----------//
const testRouter = require('./routes/index');
const dashboardRouter = require('./routes/dashboard/dashboard');
//----------- Require Package -----------//

//---- Config -----//
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//---- Winston Logger ----//
// const createdLogger = require('./utils/winston_logger');
// const logger = createdLogger();

app.use(cors());

//------------- Route -------------//
app.use('/api/test', testRouter);
app.use('/api/dashboard', dashboardRouter);



app.get('/', (req, res) => {
    res.send('Welcome to Free Time Project By NODE.JS');
});


//------- Server Port ------//
const port = GLOBAL_VALUE.NODE_PORT;

if (!port) {
  console.log(`${Colors.red}[failed] task 1 start service port :Port is not defined.`);
  console.log(`${Colors.yellow}Exit process with code 1`);
  process.exit(1);
}

const server = app.listen(port, () => {
  console.log(`${Colors.green}[success] task 1 start service port : ${Colors.yellow}${port}`);
});

server.on('error', (err) => {
  console.log(`${Colorsred}[failed] task 1 start service port : ${port}`);
  console.error(err);
  console.log(`${Colors.yellow}Exit process with code 1`);
  process.exit(1);
});

server.once('listening', async () => {
  try {
    const response = await axios.get(`http://localhost:${port}`);
    console.log(`${Colors.green}[success] Task 2 Test API Success:`, `${Colors.yellow}${response.data}${Colors.reset}`);
  } catch (error) {
    console.error(`${Colors.red}[failed] Test API:`, `${error.message}${Colors.reset}`);
  }
});

server.once('error', (err) => {
  console.error(`${Colors.red}[failed] server at port ${port}${Colors.reset}`);
  console.log(`${Colors.yellow}Exit process with code 1${Colors.reset}`);
  console.error(`${Colors.red}Error :${err}${Colors.reset}`);
  process.exit(1);
});


module.exports = server;
