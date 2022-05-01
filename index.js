const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json());
const genres = require('./routes/genres')
const customers=require('./routes/customers')
const movies=require('./routes/movies')
const rentals=require('./routes/rentals')


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);



mongoose.connect('mongodb://localhost:27017/vidly', {})
    .then((req, res) => {
        console.log("connected")
    })
    .catch((err) => {
        console.log(err);
    })
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`app is listening on port ${port}....`));