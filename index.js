const mysql = require("mysql2");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3006;

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees_db",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err);
    return;
  }
  console.log("Connected to the employees_db database.");

  // Start the main menu
  mainMenu();
});

// Function to display query results in a table
function display(query) {
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: " + err);
    } else {
      console.log("\n");
      console.table(results);
    }
    // After displaying, go back to the main menu
    mainMenu();
  });
}

// Function to display departments
function displayDepartments() {
  display("SELECT department.id 'ID', department.department 'Department' FROM department;");
}

// Define other functions for additional menu options

// List of main menu options
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

// Main menu function
function mainMenu() {
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "What do you want to do:",
        choices: menuOptions,
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "Display Departments":
          // Call the function to display departments
          displayDepartments();
          break;
        // Add cases and their respective function calls for other menu options
        case "Quit":
          console.log("Goodbye");
          db.end();
          break;
        default:
          console.log("Invalid choice. Please choose a valid option.");
          // If an invalid option is selected, go back to the main menu
          mainMenu();
      }
    });
}
