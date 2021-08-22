const mysql = require('mysql');

const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'D@niel18011998',
    database: 'formularioDb'
})

module.exports.connection = connection;