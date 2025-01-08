//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
// create a static method called getAllDepartments
async function getAllDepartments() {
    const sql = `SELECT * FROM departments`;
    const result = await pool.query(sql);
    console.log('Departments:');
    console.table(result.rows);
}
// create a static method called addNewDepartment
function addNewDepartment(departmentName) {
    const sql = `INSERT INTO departments (name) VALUES ($1)`;
    const VALUES = [departmentName];
    pool.query(sql, VALUES, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Department added successfully');
        console.log(res.rows);
    });
}
// create a static method called deleteDepartment
function deleteDepartment(departmentId) {
    const sql = `DELETE FROM departments WHERE id = $1`;
    const VALUES = [departmentId];
    pool.query(sql, VALUES, (err, res) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Department deleted successfully');
        console.log(res.rows);
    });
}
export { getAllDepartments, addNewDepartment, deleteDepartment };
