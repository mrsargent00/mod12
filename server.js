const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2515",
  database: "company",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the company database");
  start();
});

const start = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update employee role",
        "Exit",
      ],
    })
    .then(handleUserChoice);
};

const handleUserChoice = (data) => {
  switch (data.action) {
    case "View all departments":
      viewData("department");
      break;
    case "View all roles":
      viewRoles();
      break;
    case "View all employees":
      viewEmployees();
      break;
    case "Add a department":
      addData("department", "name");
      break;
    case "Add a role":
      addRole();
      break;
    case "Add an employee":
      addEmployee();
      break;
    case "Update employee role":
      updateEmployeeRole();
      break;
    default:
      console.log("See you soon!");
      db.end();
      process.exit();
  }
};

const viewData = (table) => {
  db.query(`SELECT * FROM ${table};`, (err, res) => {
    if (err) console.error(err);
    console.log("\n");
    console.table(res);
    start();
  });
};

const viewRoles = () => {
  const query = `
    SELECT role.id, title, department.name AS department, salary
    FROM role
    JOIN department ON role.department_id = department.id;
  `;

  db.query(query, (err, res) => {
    if (err) console.error(err);
    console.log("\n");
    console.table(res);
    start();
  });
};

const viewEmployees = () => {
  const query = `
    SELECT T1.id, T1.first_name, T1.last_name, role.title, department.name AS department, role.salary, CONCAT(T2.first_name, " ", T2.last_name) AS manager
    FROM ((employee T1
    LEFT JOIN employee T2 ON T1.manager_id = T2.id)
    JOIN role ON T1.role_id = role.id)
    JOIN department ON department_id = department.id;
  `;

  db.query(query, (err, res) => {
    if (err) console.error(err);
    console.log("\n");
    console.table(res);
    start();
  });
};

const addData = (table, columnName) => {
  inquirer
    .prompt({
      type: "input",
      name: "data",
      message: `Enter the ${columnName}:`,
    })
    .then((answer) => {
      const query = `INSERT INTO ${table} (${columnName}) VALUES (?)`;

      db.query(query, answer.data, (err, res) => {
        if (err) console.error(err);
        console.log("\nAdded to the database");
        start();
      });
    });
};

const addRole = () => {
  // Implement adding a role
};

const addEmployee = () => {
  // Implement adding an employee
};

const updateEmployeeRole = () => {
  // Implement updating an employee's role
};

start();
