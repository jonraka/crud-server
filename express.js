require("dotenv").config();
const express = require('express');
const app = express();
const {
    sendNotFound
} = require('./utils/sender');

app.use(express.json());

app.use('/api', require('./routes/apiRoutes'));
app.use('*', (_req, res) => sendNotFound(res));

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Listening at port: ${process.env.EXPRESS_PORT}`)
})