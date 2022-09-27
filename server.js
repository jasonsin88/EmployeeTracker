const mysql = require('mysql2')
const inquirer = require('inquirer'); 
const consoleTable = require('console.table'); 

require('dotenv').config()

// connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.MYSQL_PASSWORD,
  database: 'employee_db'
});

connection.connect(err => {
  if (err) throw err;
  console.log('connected as id ' + connection.threadId);
  console.log(`
 _______             _                           ______                                      
|  _____)           | |                         |      \                                     
| |___   ____  ____ | | ___  _   _  ____ ____   |  /-\  | ____ ____   ____  ____  ____  ____ 
|  ___) |    \|  _ \| |/ _ \| | | |/ _  ) _  )  | || || |/ _  |  _ \ / _  |/ _  |/ _  )/ ___)
| |_____| | | | | | | | |_| | |_| ( (/ ( (/ /   | || || ( ( | | | | ( ( | ( ( | ( (/ /| |    
|_______)_|_|_| ||_/|_|\___/ \__  |\____)____)  |_||_||_|\_||_|_| |_|\_||_|\_|| |\____)_|    
              |_|           (____/                                        (_____|            `)
  // runs the app
  promptUser();
});