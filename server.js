const mysql = require('mysql');
const inquirer = require('inquirer'); 
const dbUtil = require('./db/dbUtil');
const dbQuery = require('./db/dbUtil');
const cTable = require('console.table'); 

console.log(`
 _______             _                           ______                                      
|  _____)           | |                         |       |                                     
| |___   ____  ____ | | ___  _   _  ____ ____   |  /-|  | ____ ____   ____  ____  ____  ____ 
|  ___) |     |  _  | |/ _  | | | |/ _  ) _  )  | || || |/ _  |  _ \ / _  |/ _  |/ _  )/ ___)
| |_____| | | | | | | | |_| | |_| ( (/ ( (/ /   | || || ( ( | | | | ( ( | ( ( | ( (/ /| |    
|_______)_|_|_| ||_/|_||___/ |__  ||____)____)  |_||_||_||_||_|_| |_||_||_||_|| ||____)_|    
              |_|           (____/                                        (_____|            `)
  
// runs the app
promptUser();

function promptUser() {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View all departments',
                      'View all roles',
                      'View all employees',
                      'Add a department',
                      'Add a role',
                      'Add an employee',
                      'Update an employee role',
                      'Update an employee manager',
                      'View employees by department',
                      'Delete a department',
                      'Delete a role',
                      'Delete an employee',
                      'View department budgets',
                      'No action']  
        }
    ])
    .then((answers) => {
        console.log(answers);
        switch (answers.option_) {
        case 'View all departments':
            return showDepartments();
        case 'View all roles':
            return showRoles();
        case 'View all employees':
            return showEmployees();
        case 'Add a department':
            return addDepartment();
        case 'Add a role':
            return addRole();
        case 'Add an employee':
            return addEmployee();
        case 'Update an employee role':
            return updateEmployee();
        case 'Update an employee manager':
            return updateManager();
        case 'View employees by department':
            return employeeDepartment();
        case 'Delete a department':
            return deleteDepartment();
        case 'Delete a role':
            return deleteRole();
        case 'Delete an employee':
            return deleteEmployee();
        case 'View department budgets':
            return viewBudget();
        case 'No Action':
            return connection.end()
        }
    });
};
