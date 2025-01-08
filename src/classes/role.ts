//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
//import { QueryResult } from 'pg';
import { QueryResult } from 'pg';


// create a static method called getAllRoles
function getAllRoles() {
    const sql = `SELECT * FROM roles`;
    pool.query(sql, (err: Error, res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.table(res.rows);
    });
}

// create a static method called addNewRole
function addNewRole(title: string, salary: number, departmentId: number) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
    const VALUES = [title, salary, departmentId];
    return pool.query(sql, VALUES, (err: Error, _res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Role added successfully');
    });
}

// create a static method called deleteRole
function deleteRole(roleId: number) {
    const sql = `DELETE FROM roles WHERE id = $1`;
    const VALUES = [roleId];
    return pool.query(sql, VALUES, (err: Error, _res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Role deleted successfully');
    });
}


export { getAllRoles, addNewRole, deleteRole };