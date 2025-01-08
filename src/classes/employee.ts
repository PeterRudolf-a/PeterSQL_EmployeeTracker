//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
//import { QueryResult } from 'pg';
import { QueryResult } from 'pg';


// create a static method called getAllEmployees
function getAllEmployees() {
    const sql = `SELECT * FROM employees`;
    pool.query(sql, (err: Error, res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.table(res.rows);
    });
}

// create a static method called addNewEmployee
function addNewEmployee(firstName: string, lastName: string, roleId: number, managerId?: number) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    const VALUES = [firstName, lastName, roleId, managerId];

    pool.query(sql, VALUES, (err: Error, _res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Employee added successfully');
    });

}

// create a static method called deleteEmployee
async function deleteEmployee(userId: number) {
    const sql = `DELETE FROM employees WHERE id = $1`;
    const VALUES = [userId];
    pool.query(sql, VALUES, (err: Error, _res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Employee deleted successfully');
    });
}

// create a static method called updateEmployee
async function updateEmployeeRole(firstName: string, lastName: string, roleType: string) {
    const sql = `UPDATE employees SET role_id = (SELECT id FROM roles WHERE title = $3) WHERE first_name = $1 AND last_name = $2`;
    const VALUES = [firstName, lastName, roleType];
    pool.query(sql, VALUES, (err: Error, _res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Employee role updated successfully');
    });
}

export { getAllEmployees, addNewEmployee, deleteEmployee, updateEmployeeRole };