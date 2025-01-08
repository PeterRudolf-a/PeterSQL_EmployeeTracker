//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
// create a static method called getAllEmployees
function getAllEmployees() {
    const sql = `SELECT * FROM employees`;
    pool.query(sql, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log(console.table(res.rows));
    });
}
// create a static method called addNewEmployee
function addNewEmployee(firstName, lastName, roleId, managerId) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    const VALUES = [firstName, lastName, roleId, managerId];
    pool.query(sql, VALUES, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Employee added successfully');
        console.log(res.rows);
    });
}
// create a static method called deleteEmployee
async function deleteEmployee(userId) {
    const sql = `DELETE FROM employees WHERE id = $1`;
    const VALUES = [userId];
    pool.query(sql, VALUES, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Employee deleted successfully');
        console.log(res.rows);
    });
}
// create a static method called updateEmployee
async function updateEmployeeRole(firstName, lastName, roleType) {
    const sql = `UPDATE employees SET role_id = (SELECT id FROM roles WHERE title = $3) WHERE first_name = $1 AND last_name = $2`;
    const VALUES = [firstName, lastName, roleType];
    pool.query(sql, VALUES, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Employee role updated successfully');
        console.log(res.rows);
    });
}
export { getAllEmployees, addNewEmployee, deleteEmployee, updateEmployeeRole };
