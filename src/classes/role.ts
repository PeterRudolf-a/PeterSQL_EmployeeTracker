//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
//import { QueryResult } from 'pg';
import { QueryResult } from 'pg';

// create a static method called checkDepartment to check if a department exists
async function checkDepartment(department: string) {
    // create a SQL query to select the department id
    const sql = `SELECT id FROM departments WHERE LOWER(name) = LOWER($1)`;
    const values = [department];
    // query the database using the pool object
    const result = await pool.query(sql, values);
    return result.rows[0] ? result.rows[0].id : null;
}

// create a static method called getAllRoles
async function getAllRoles() {
    // create a SQL query to select all roles with their department names
    const sql = `SELECT roles.id, roles.title, departments.name AS department, roles.salary 
                FROM roles
                JOIN departments ON roles.department_id = departments.id`;

    try {
        // query the database using the pool object
        const result = await pool.query(sql);
        // log the result in a table format
        console.log(`\nid\tname                           department              salary`);
        console.log(`--\t-----------------              -----------             ----------`);
        for (const role of result.rows) {
            console.log(`${role.id}\t${role.title.padEnd(30)}${role.department.padEnd(30)}${role.salary}`);
        }
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
}

// create a static method called addNewRole
async function addNewRole(title: string, salary: number, department: string) {
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
        await pool.query(sql, values);
        console.log('Role added successfully:');
    } catch (err) {
        console.error('Error executing query', err);
    }
}

// create a static method called deleteRole
function deleteRole(role: string) {
    // create a SQL query to delete a role
    const sql = `DELETE FROM roles WHERE title = $1`;
    const VALUES = [role];
    // query the database using the pool object
    return pool.query(sql, VALUES, (err: Error, _res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('Role deleted successfully');
    });
}

// export the functions to be used in other files
export { getAllRoles, addNewRole, deleteRole };