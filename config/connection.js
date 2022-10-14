const mysql = require('mysql2');
const chalk = require('chalk');

// connect to MySQL
connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Pikachu1!',
    database: 'employee_db',
    multipleStatements: true
});

connection.connect((err) => {
    if (err) {
        console.log(chalk.bold.white.bgRed(err));
        return;
    }

    console.log(chalk.bold.greenBright(`Connected to db. ThreadID: ${connection.threadId}`));
})

module.exports = connection;