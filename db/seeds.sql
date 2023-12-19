-- Create the 'company' database if it doesn't exist
USE company;

-- Create and insert data into the 'department' table
CREATE TABLE IF NOT EXISTS department (
    name VARCHAR(255)
);
INSERT INTO department (name)
VALUES ('Maintenance'), ('Leasing Office'), ('Operations');

-- Create and insert data into the 'role' table
CREATE TABLE IF NOT EXISTS role (
    title VARCHAR(255),
    salary DECIMAL(10, 2),
    department_id INT
);
INSERT INTO role (title, salary, department_id)
VALUES
    ('Maintenance Tech', 30000.00, 1),
    ('Office Staff', 32000.00, 2),
    ('Community Manager', 40000.00, 3);

-- Create and insert data into the 'employee' table
CREATE TABLE IF NOT EXISTS employee (
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    role_id INT,
    manager_id INT
);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Dawson', 1, 3), ('Whitney', 'Hart', 2, 3), ('Billy', 'Johnson', 2, NULL);
