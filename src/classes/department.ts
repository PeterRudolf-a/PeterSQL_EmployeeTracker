//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
//import { QueryResult } from 'pg';
import { QueryResult } from 'pg';

// Function to format and log values in a fixed-length format
function logWithFixedLength(columns: any[], columnWidths: any[]) {
    const formattedRow = columns.map((col, index) => {
        const width = columnWidths[index] || 10; // Default to 10 if no width is specified
        return String(col).padEnd(width); // Pad each column to the specified width
    }).join(""); // Join the columns without extra spaces between
    console.log(formattedRow);
}

// create a static method called getAllDepartments
function getAllDepartments() {
    // create a SQL query to select all departments
    const sql = `SELECT id, name FROM departments`;

    // query the database using the pool object
    pool.query(sql, (err: Error, res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        // log the result in a table format
        console.log('\n');
        // variables
        const id = res.rows[0].id;
        const name = res.rows[0].name;

        // Define column widths
        const columnWidths = [5, 30]; // [ID, Name]

        // Log a header
        logWithFixedLength(["ID", "Name"], columnWidths);

        // Log a separator
        console.log("-".repeat(columnWidths.reduce((sum, width) => sum + width, 0)));

        // Log data rows
        logWithFixedLength([id, name], columnWidths);
    });
}
//(`${department}\t${department.1d}`;)

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
