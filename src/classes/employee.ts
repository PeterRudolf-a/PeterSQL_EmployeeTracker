//import { Pool, connectToDB } from './connection.js';
import { pool } from '../connection.js';
//import { QueryResult } from 'pg';
import { QueryResult } from 'pg';

// create a static method called checkRole to check if a role exists in the roles table
async function checkRole(role: string) {
    // create a SQL query to select the role id
    const sql = `SELECT id FROM roles WHERE LOWER(title) = LOWER($1)`;
    const values = [role];
    // query the database using the pool object
    const result = await pool.query(sql, values);
    return result.rows[0] ? result.rows[0].id : null;
}

// create a static method called getAllEmployees
async function getAllEmployees() {
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
    
    try {
        const result = await pool.query(sql);
        
        // Log the result in a table format
        console.log(`\nid\tfirst_name\t\tlast_name\t\ttitle\t\t\tdepartment\t\t\tsalary\t\tmanager`);
        console.log(`--\t-----------------\t-------------\t\t--------------\t\t\t---------\t\t------\t\t------------`);
        for (const employee of result.rows) {
            let manager = employee.manager ? employee.manager : 'None';
            console.log(
                `${employee.id}\t${(employee.first_name || '').padEnd(20)}\t${(employee.last_name || '').padEnd(20)}\t${(employee.title || '').padEnd(30)}\t${(employee.department || '').padEnd(20)}\t${(employee.salary || '0').toString().padEnd(10)}\t${manager}`
            );
        }
    } catch (err) {
        console.error('Error executing query', err);
    }
}

// create a static method called addNewEmployee
async function addNewEmployee(firstName: string, lastName: string, role_id: string, manager_id?: string) {
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
    } catch (err) {
        console.error('Error executing query', err);
    }

}

// create a static method called deleteEmployee
async function deleteEmployee(userFirstName: string, userLastName: string) {
    // create a SQL query to delete an employee
    const sql = `DELETE FROM employees WHERE first_name = $1 AND last_name = $2`;
    const VALUES = [userFirstName, userLastName];
    // query the database using the pool object
    pool.query(sql, VALUES, (err: Error, _res: QueryResult) => {
        if (err) {
            console.error('Error executing query', err);
            return;
        }
        console.log('\nEmployee deleted successfully');
    });
}

// create a static method called updateEmployee
async function updateEmployeeRole(firstName: string, lastName: string, roleType: string) {
    // create a SQL query to update the role of an employee using the role_id foreign key from the roles table
    const sql = `UPDATE employees SET role_id = (SELECT id FROM roles WHERE title = $3) WHERE first_name = $1 AND last_name = $2`;
    const VALUES = [firstName, lastName, roleType];
    // query the database using the pool object
    try {
        await pool.query(sql, VALUES);
        console.log('\nEmployee updated successfully');
    } catch (err) {
        console.error('Error executing query', err);
    }
}

export { getAllEmployees, addNewEmployee, deleteEmployee, updateEmployeeRole };