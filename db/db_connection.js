const mysql = require('mysql2')

let connection;

function connectToDatabase() {
    if (!connection) {
        connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'lav67#Sabra',
            database: 'express_db',
            port: 3307
        });
    }
}
