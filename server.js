const mysql2 = require('mysql2');
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
                      'Delete a department',
                      'Delete a role',
                      'Delete an employee',
                      'View department budgets',
                      'No action']  
        }
    ])
    .then((answers) => {
        console.log(answers);
        switch (answers.choices) {
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

async function showDepartments() {
  const departments = await dbQuery.viewAllDepartments();
  console.table(departments);
  promptUser();
};

async function showRoles() {
  const roles = await dbQuery.viewAllRoles();
  console.table(roles);
  promptUser();
};

async function showEmployees() {
  const employees = await dbQuery.getAllEmployees();
  console.table(employees);
  promptUser();
};

async function addDepartment() {
  const department = await inquirer.prompt({
    type: 'input',
    message: 'What is the department name?',
    name: 'name',
  });
  await dbQuery.createDepartment(department);
  promptUser();
}

async function addEmployee() {
  const rolesOptions = await dbUtil.viewAllRoles();
  const managerOptions = await dbUtil.getAllEmployees();
  const addEmployee = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the employee first name?',
      name: 'first_name',
    },
    {
      type: 'input',
      message: 'What is the employee last name?',
      name: 'last_name',
    },
  ]);
  let roleChoices = rolesOptions.map(({ id, title }) => ({ name: title, value: id }));
  const {roleId}  = await inquirer.prompt({
    type: 'list',
    name: 'roleId',
    message: 'What is this new employees role?',
    choices: roleChoices,
  });
  const managerChoices = managerOptions.map(({ first_name, last_name, id }) => ({ name: first_name + last_name, value: id }));
  if (managerChoices && managerChoices.length > 0) {
  const { managerId } = await inquirer.prompt({
    type: 'list',
    name: 'managerId',
    message: 'Please select this new employees manager:',
    choices: managerChoices,
  })};
  addEmployee.manager_id = managerId;
  addEmployee.role_id = roleId;
  await dbUtil.createEmployee(employeeToAdd);
  promptUser();
}

async function addRole() {
  const departments = await dbQuery.viewAllDepartments();
  const departmentsList = departments.map(({ id, name }) => ({ name: name, value: id }));
  const roleToAdd = await inquirer.prompt([
    {
      type: 'input',
      message: 'What is the role?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'What is the salary for this role?',
      name: 'salary',
    },
    {
      type: 'list',
      message: 'What is the department ID number?',
      name: 'department_id',
      choices: departmentsList,
    },
  ]);
  await dbQuery.addRole(roleToAdd);
  promptUser();
}

async function updateEmployee() {
  const employeeOptions = await dbUtil.getAllEmployees();
  const rolesOptions = await dbUtil.viewAllRoles();
  console.log(rolesOptions);
  const employeesList= employeeOptions.map(({ id, first_name, last_name }) => ({
    name: first_name + last_name,
    value: id,
  }));
  const rolesList = rolesOptions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const { employeeId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee whose role you wish to change:',
      choices: employeesList,
    },
  ]);
  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'What new role would you like to assign to this employee?',
      choices: rolesList,
    },
  ]);
  await dbUtil.updateEmployeeRole(employeeId, roleId);
  promptUser();
}

async function deleteEmployee() {
  const employeeOptions = await dbUtil.getAllEmployees();
  const employeesList = employeeOptions.map(({ id, first_name, last_name }) => ({
    name: first_name + last_name,
    value: id,
  }));
  const { employeeId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Which employee would you like to delete?',
      choices: employeesList,
    },
  ]);
  await dbUtil.removeEmployee(employeeId);
  promptUser();
}

async function deleteRole() {
  const rolesOptions = await dbUtil.viewAllRoles();
  const rolesList = rolesOptions.map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const { roleId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Which role would you like to delete?',
      choices: rolesList,
    },
  ]);
  await dbUtil.removeRole(roleId);
  promptUser();
}

async function deleteDepartment() {
  const departmentOptions = await dbUtil.viewAllDepartments();
  const departmentsList = departmentOptions.map(({ id, name }) => ({ name: name, value: id }));

  const { departmentId } = await inquirer.prompt({
    type: 'list',
    name: 'departmentId',
    message: 'Which department would you like to delete?',
    choices: departmentsList,
  });
  await dbUtil.removeDepartment(departmentId);
  promptUser();
}

