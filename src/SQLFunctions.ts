import { Pool, connectToDB } from 'pg';
import {QueryResult} from 'pg';

function GetAllDepartments() {
    return `SELECT * FROM department`;
}

function GetAllEmployees() {
    return `SELECT * FROM employees`;
}

function GetAllRoles() {
    return `SELECT * FROM roles`;
}

function CreateNewDepartment(departmentName: string) {
    const sql = `INSERT INTO department (name) VALUES ($1)`;
    const VALUES = [departmentName];
    return pool.query(sql, VALUES);
}

function AddRole(title: string, salary: number, departmentId: number) {
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
    const VALUES = [title, salary, departmentId];
    return pool.query(sql, VALUES);
}

function AddEmployee(firstName: string, lastName: string) {
    return `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`;
}

