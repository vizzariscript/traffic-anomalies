let express = require('express')
let bodyParser = require('body-parser')
let cors = require('cors')
let jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// let mongoose = require('mongoose');
let app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//connect to mongoose
// const dbPath = 'mongodb://localhost/';
// const options = {useNewUrlParser: true, useUnifiedTopology: true}
// const mongo = mongoose.connect(dbPath, options);
// mongo.then(() => {
//     console.log('connected');
// }, error => {
//     console.log(error, 'error');
// })

//models
// require('./models/index')

// JWT Automatically authentication
const token = jwt.sign({ id: 'intellisite_id' }, process.env.JWT_KEY, {
    expiresIn: 14400 // EXPIRES IN 4HS
});

const anomaliesRoutes = require('./routes/anomalies.route')
app.use('/api/anomalies', anomaliesRoutes)

app.listen(port, function () {
    console.log("Traffic Anomalies api running on port " + port);
    console.log('*********************************');
    console.log('*********************************');
    console.log('USE THE FOLLOWING TOKEN:');
    console.log(token);
    console.log('*********************************');
    console.log('*********************************');
})

module.exports = app;