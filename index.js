const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2515",
  database: "employees_db",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err);
    return;
  }
  console.log("Connected to the employees_db database.");
  mainMenu();
});

function display(query) {
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: " + err);
    } else {
      console.log("\n");
      console.table(results);
    }
    mainMenu();
  });
}

const menuOptions = [
  "Display Departments",
  "Display Roles",
  "Display Employees",
  "Add Department",
  "Add Role",
  "Add Employee",
  "Update Employee",
  "Delete Menu",
  "Quit",
];

function mainMenu() {
  inquirer.prompt([
    {
      name: "choice",
      type: "list",
      message: "What do you want to do:",
      choices: menuOptions,
    },
  ]).then((answers) => {
    switch (answers.choice) {
      case "Display Departments":
        display("SELECT department.id 'ID', department.department 'Department' FROM department;");
        break;
      // Add other cases and their respective functions here
      default:
        console.log("Goodbye");
        db.end();
    }
  });
}

// Can add other functions with comments here
