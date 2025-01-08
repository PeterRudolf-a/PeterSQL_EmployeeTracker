//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
// create a static method called getAllRoles
async function getAllRoles() {
    const sql = `SELECT * FROM roles`;
    const result = await pool.query(sql);
    console.table(result.rows);
}
// create a static method called addNewRole
function addNewRole(title, salary, departmentId) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
    const VALUES = [title, salary, departmentId];
    return pool.query(sql, VALUES, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Role added successfully');
        console.log(res.rows);
    });
}
// create a static method called deleteRole
function deleteRole(roleId) {
    const sql = `DELETE FROM roles WHERE id = $1`;
    const VALUES = [roleId];
    return pool.query(sql, VALUES, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Role deleted successfully');
        console.log(res.rows);
    });
}
export { getAllRoles, addNewRole, deleteRole };
