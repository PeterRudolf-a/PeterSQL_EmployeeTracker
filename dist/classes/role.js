//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
function logWithFixedLength(columns, columnWidths) {
    const formattedRow = columns.map((col, index) => {
        const width = columnWidths[index] || 10; // Default to 10 if no width is specified
        return String(col).padEnd(width); // Pad each column to the specified width
    }).join(""); // Join the columns without extra spaces between
    console.log(formattedRow);
}
// create a static method called checkDepartment to check if a department exists
async function checkDepartment(department) {
    // create a SQL query to select the department id
    const sql = `SELECT id FROM departments WHERE LOWER(name) = LOWER($1)`;
    const values = [department];
    // query the database using the pool object
    const result = await pool.query(sql, values);
    return result.rows[0] ? result.rows[0].id : null;
}
// create a static method called getAllRoles
function getAllRoles() {
    // create a SQL query to select all roles with their department names
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department 
                FROM roles
                JOIN departments ON roles.department_id = departments.id`;
    // query the database using the pool object
    pool.query(sql, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        // variables
        const id = res.rows[0].id;
        const title = res.rows[0].name;
        const salary = res.rows[0].salary;
        const department = res.rows[0].department;
        // Define column widths
        const columnWidths = [5, 30, 5, 30]; // [ID, Title, Salary, Department]
        // Log a header
        logWithFixedLength(["ID", "Title", "Salary", "Department"], columnWidths);
        // Log a separator
        console.log("-".repeat(columnWidths.reduce((sum, width) => sum + width, 0)));
        // Log data rows
        logWithFixedLength([id, title, salary, department], columnWidths);
    });
}
// create a static method called addNewRole
async function addNewRole(title, salary, department) {
    console.log('Inserting role with title:', title, 'salary:', salary, 'department:', department);
    try {
        // check if the department exists
        const departmentId = await checkDepartment(department);
        // if the department does not exist, log an error message
        if (!departmentId) {
            console.error('No department found with that name. Please check the department name.');
            return;
        }
        // create a SQL query to insert a new role into the roles table
        const sql = `INSERT INTO roles (title, salary, department_id) 
                     VALUES ($1, $2, $3) RETURNING *`;
        const values = [title, salary, departmentId];
        // query the database using the pool object
        const result = await pool.query(sql, values);
        console.log('\nRole added successfully:', result.rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
    }
}
// create a static method called deleteRole
function deleteRole(role) {
    // create a SQL query to delete a role
    const sql = `DELETE FROM roles WHERE title = $1`;
    const VALUES = [role];
    // query the database using the pool object
    return pool.query(sql, VALUES, (err, _res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('\nRole deleted successfully');
    });
}
// export the functions to be used in other files
export { getAllRoles, addNewRole, deleteRole };
