//init code
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const database = require('./database');
const userController = require('./controllers/user');

//middleware setup
app.use(cors());
app.use('/api/user', userController);

//default routes
app.all('/', (req,res) => {
    res.send("Hello World");
});

//start server
app.listen(port, () => {
    console.log(`Server Running at Port ${port}`);
});