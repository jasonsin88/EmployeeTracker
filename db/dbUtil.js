const connection = require("./connection");

class dbQueryUtil {
  constructor(connection) {
    this.connection = connection;
  }

// Employee functions
  getAllEmployees() {
    return this.connection.query("SELECT * FROM employee");
  }
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
  updateEmployee() {
    return this.connection.query("UPDATE employee SET role_id = role_id WHERE first_name = name");
  }

// Role functions
  viewAllRoles() {
    return this.connection.query("SELECT id, title, salary, department_id AS role FROM role");
  }
  addRole(newRole) {
    return this.connection.query("INSERT INTO role SET ?", newRole);
  }
