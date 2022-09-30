const mysql = require('mysql');
const inquirer = require('inquirer');
const chalk = require('chalk');
const cTable = require('console.table');
const connection = require('./config/connection');
const startScreen = [
  'View all Employees', 
  'View all Emplyees by Department', 
  'View all Employees by Manager', 
  'Add Employee', 
  'Remove Employee', 
  'Update Employee Role', 
  'View all Roles', 
  'Add Role', 
  'Remove Role', 
  'View all Departments', 
  'Add Department', 
  'Remove Department', 
  'Exit'
]
const allEmployeeQuery = `SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", r.title, d.department_name AS "Department", IFNULL(r.salary, 'No Data') AS "Salary", CONCAT(m.first_name," ",m.last_name) AS "Manager"
FROM employees e
LEFT JOIN roles r 
ON r.id = e.role_id 
LEFT JOIN departments d 
ON d.id = r.department_id
LEFT JOIN employees m ON m.id = e.manager_id
ORDER BY e.id;`
const addEmployeeQuestions = [
  'What is the first name?', 
  'What is the last name?', 
  'What is their role?', 
  'Who is their manager?'
]
// const roleQuery = 'SELECT * from roles; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = "Management"'
const roleQuery = 'SELECT * from roles; SELECT CONCAT (e.first_name," ",e.last_name) AS full_name FROM employees e'
const mgrQuery = 'SELECT CONCAT (e.first_name," ",e.last_name) AS full_name, r.title, d.department_name FROM employees e INNER JOIN roles r ON r.id = e.role_id INNER JOIN departments d ON d.id = r.department_id WHERE department_name = "Management";'

console.log(chalk.magenta(`
 _______             _                           ______                                      
|  _____)           | |                         |       |                                     
| |___   ____  ____ | | ___  _   _  ____ ____   |  /-|  | ____ ____   ____  ____  ____  ____ 
|  ___) |     |  _  | |/ _  | | | |/ _  ) _  )  | || || |/ _  |  _ \ / _  |/ _  |/ _  )/ ___)
| |_____| | | | | | | | |_| | |_| ( (/ ( (/ /   | || || ( ( | | | | ( ( | ( ( | ( (/ /| |    
|_______)_|_|_| ||_/|_||___/ |__  ||____)____)  |_||_||_||_||_|_| |_||_||_||_|| ||____)_|    
              |_|           (____/                                        (_____|            `
));
  
// runs the app
const startApp = () => {
  inquirer.prompt({
      name: 'menuChoice',
      type: 'list',
      message: 'Select an option',
      choices: startScreen
  }).then((answer) => {
      switch (answer.menuChoice) {
          case 'View all Employees':
              showAll();
              break;
          case 'View all Emplyees by Department':
              showByDept();
              break;
          case 'View all Employees by Manager':
              showByManager();
              break;
          case 'Add Employee':
              addEmployee();
              break;
          case 'Remove Employee':
              removeEmployee();
              break;
          case 'Update Employee Role':
              updateRole();
              break;
          case 'View all Roles':
              viewRoles();
              break;
          case 'Add Role':
              addRole();
              break;
          case 'Remove Role':
              removeRole();
              break;
          case 'View all Departments':
              viewDept();
              break;
          case 'Add Department':
              addDept();
              break;
          case 'Remove Department':
              removeDept();
              break;
          case 'Exit':
              connection.end();
              break;
      }
  })
}