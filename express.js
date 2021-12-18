require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.EXPRESS_PORT || 3011;
const {
    sendNotFound
} = require('./utils/sender');

app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/apiRoutes'));
app.use('*', (_req, res) => sendNotFound(res));

app.listen(PORT, () => {
    console.log(`Listening at port: ${process.env.EXPRESS_PORT}`)
})