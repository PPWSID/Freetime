global.express = require("express")
global.cors    = require("cors")
global.mongoose = require("mongoose")
global.bodyParser = require('body-parser')
global.axios = require('axios')
global.GLOBAL_VALUE = process.env
global.Schema = mongoose.Schema
global.jwt = require('jsonwebtoken')
global.Colors = require('../constants/colors')

require('dotenv').config()

//--------------- Connect to Mongo ---------------//
const mongo_uri = GLOBAL_VALUE.MG_CONNECT
// console.log(mongo_uri)
mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log(`${Colors.green}[Success] Task 3 : ${Colors.yellow}connected to the mongo database ${Colors.reset}`);
}).catch((error) => {
    console.log(`${Colors.red}[Failed] Task 3` + `${error}${Colors.reset}`);
    process.exit();
})

