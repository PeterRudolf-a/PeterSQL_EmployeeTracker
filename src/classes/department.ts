//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
//import { QueryResult } from 'pg';
import { QueryResult } from 'pg';

// create a static method called getAllDepartments
async function getAllDepartments() {
    // create a SQL query to select all departments
    const sql = `SELECT id, name FROM departments`;

    // query the database using the pool object
    try {
        const result = await pool.query(sql);
        // log the result in a table format
        console.log(`\nid\tname`);
        console.log(`--\t-----------------`);
        for (const department of result.rows) {
            console.log(`${department.id}\t${department.name}`);
        }

    } catch (err) {
        console.error('Error executing query', err);
    }
}

// create a static method called addNewDepartment
async function addNewDepartment(departmentName: string) {
    // create a SQL query to insert a new department
    const sql = `INSERT INTO departments (name) VALUES ($1)`;
    const VALUES = [departmentName];

    // query the database using the pool object
    try {
        await pool.query(sql, VALUES);
        console.log('\nDepartment added successfully');
    } catch (err) {
        console.error('Error executing query', err);
    }
}

// create a static method called deleteDepartment
function deleteDepartment(department: string) {
    // create a SQL query to delete a department
    const sql = `DELETE FROM departments WHERE name = $1`;
    const VALUES = [department];
    // query the database using the pool object
    pool.query(sql, VALUES, (err: Error, _res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('\nDepartment deleted successfully');
    });
}

// export the functions to be used in other files
export { getAllDepartments, addNewDepartment, deleteDepartment };
