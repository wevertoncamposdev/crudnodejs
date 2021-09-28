const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('handlebars');

app = express();

app.listen(3000, (req, res) => {
    console.log('Server running')
});