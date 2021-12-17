require("dotenv").config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('test')
})

app.use('/api', require('./routes/apiRoutes'));

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Listening at port: ${process.env.EXPRESS_PORT}`)
})