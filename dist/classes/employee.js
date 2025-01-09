//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
function logWithFixedLength(columns, columnWidths) {
    const formattedRow = columns.map((col, index) => {
        const width = columnWidths[index] || 10; // Default to 10 if no width is specified
        return String(col).padEnd(width); // Pad each column to the specified width
    }).join(""); // Join the columns without extra spaces between
    console.log(formattedRow);
}
// create a static method called checkRole to check if a role exists in the roles table
async function checkRole(role) {
    // create a SQL query to select the role id
    const sql = `SELECT id FROM roles WHERE LOWER(title) = LOWER($1)`;
    const values = [role];
    // query the database using the pool object
    const result = await pool.query(sql, values);
    return result.rows[0] ? result.rows[0].id : null;
}
// create a static method called getAllEmployees
function getAllEmployees() {
    // create a SQL query to select all employees with their roles, departments, salaries, and managers
    const sql = `SELECT employees.id, 
                        employees.first_name, 
                        employees.last_name, 
                        roles.title, 
                        departments.name AS department, 
                        roles.salary, 
                        CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                 FROM employees
                 LEFT JOIN roles ON employees.role_id = roles.id
                 LEFT JOIN departments ON roles.department_id = departments.id
                 LEFT JOIN employees AS manager ON employees.manager_id = manager.id`;
    // query the database using the pool object
    pool.query(sql, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        // variables
        const id = res.rows[0].id;
        const firstName = res.rows[0].first_name;
        const lastName = res.rows[0].last_name;
        const role = res.rows[0].title;
        const department = res.rows[0].department;
        const salary = res.rows[0].salary;
        const manager = res.rows[0].manager;
        // Define column widths
        const columnWidths = [5, 30, 30, 30, 30, 5, 60]; // [ID, First Name, Last Name, Role, Department, Salary, Manager]
        // Log a header
        logWithFixedLength(["ID", "First Name", "Last Name", "Role", "Department", "Salary", "Manager"], columnWidths);
        // Log a separator
        console.log("-".repeat(columnWidths.reduce((sum, width) => sum + width, 0)));
        // Log data rows
        logWithFixedLength([id, firstName, lastName, role, department, salary, manager], columnWidths);
    });
}
// create a static method called addNewEmployee
async function addNewEmployee(firstName, lastName, role_id, manager_id) {
    console.log('Inserting employee with first name:', firstName, 'last name:', lastName, 'role:', role_id, 'manager:', manager_id);
    try {
        // check if the role exists
        const role = await checkRole(role_id);
        // if the role does not exist, log an error message
        if (!role) {
            console.error('No role found with that name. Please check the role name.');
            return;
        }
        // create a SQL query to insert a new employee into the employees table using the role_id and manager_id foreign keys from the roles and employees tables
        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) 
        VALUES ($1, $2, (SELECT id FROM roles WHERE title = $3), (SELECT id FROM employees WHERE first_name = $4))`;
        let VALUES = [firstName, lastName, role_id, manager_id];
        // query the database using the pool object
        await pool.query(sql, VALUES);
        console.log('\nEmployee added successfully');
    }
    catch (err) {
        console.error('Error executing query', err);
    }
}
// create a static method called deleteEmployee
async function deleteEmployee(userFirstName, userLastName) {
    // create a SQL query to delete an employee
    const sql = `DELETE FROM employees WHERE first_name = $1 AND last_name = $2`;
    const VALUES = [userFirstName, userLastName];
    // query the database using the pool object
    pool.query(sql, VALUES, (err, _res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('\nEmployee deleted successfully');
    });
}
// create a static method called updateEmployee
async function updateEmployeeRole(firstName, lastName, roleType) {
    // create a SQL query to update the role of an employee using the role_id foreign key from the roles table
    const sql = `UPDATE employees SET role_id = (SELECT id FROM roles WHERE title = $3) WHERE first_name = $1 AND last_name = $2`;
    const VALUES = [firstName, lastName, roleType];
    // query the database using the pool object
    try {
        await pool.query(sql, VALUES);
        console.log('\nEmployee updated successfully');
    }
    catch (err) {
        console.error('Error executing query', err);
    }
}
// export the functions to be used in other files
export { getAllEmployees, addNewEmployee, deleteEmployee, updateEmployeeRole };
