//import { Pool, connectToDB } from './connection.js';
import { pool, connectToDB } from '../connection.js';
//import { QueryResult } from 'pg';
import {QueryResult} from 'pg';

// create a class called department
class department {
    id: number;
    name: string;

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    // create a static method called getAllDepartments
    static async GetAllDepartments() {
        const sql = `SELECT * FROM department`;

        return pool.query(sql);
    }

    // create a static method called addNewDepartment
    static async AddNewDepartment(departmentName: string) {
        const sql = `INSERT INTO department (name) VALUES ($1)`;
        const VALUES = [departmentName];
        return pool.query(sql, VALUES);
    }

    // create a static method called deleteDepartment
    static async DeleteDepartment(departmentId: number) {
        const sql = `DELETE FROM department WHERE id = $1`;
        const VALUES = [departmentId];
        return pool.query(sql, VALUES);
    }

    // create a static method called updateDepartment
    static async UpdateDepartment(departmentId: number, departmentName: string) {
        const sql = `UPDATE department SET name = $1 WHERE id = $2`;
        const VALUES = [departmentName, departmentId];
        return pool.query(sql, VALUES);
    }
}

// create a class called role
class role {
    id: number;
    title: string;
    salary: number;
    departmentId: number;

    constructor(id: number, title: string, salary: number, departmentId: number) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.departmentId = departmentId;
    }

    // create a static method called getAllRoles
    static async GetAllRoles() {
        const sql = `SELECT * FROM roles`;

        return pool.query(sql);
    }

    // create a static method called addNewRole
    static async AddNewRole(title: string, salary: number, departmentId: number) {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)`;
        const VALUES = [title, salary, departmentId];
        return pool.query(sql, VALUES);
    }

    // create a static method called deleteRole
    static async DeleteRole(roleId: number) {
        const sql = `DELETE FROM roles WHERE id = $1`;
        const VALUES = [roleId];
        return pool.query(sql, VALUES);
    }

    // create a static method called updateRole
    static async UpdateRole(roleId: number, title: string, salary: number, departmentId: number) {
        const sql = `UPDATE roles SET title = $1, salary = $2, department_id = $3 WHERE id = $4`;
        const VALUES = [title, salary, departmentId, roleId];
        return pool.query(sql, VALUES);
    }
}

// create a class called employee
class employee {
    id: number;
    firstName: string;
    lastName: string;
    roleId: number;
    managerId?: number;

    constructor(id: number, firstName: string, lastName: string, roleId: number, managerId?: number) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleId = roleId;
        this.managerId = managerId;
    }

    // create a static method called getAllEmployees
    static async GetAllEmployees() {
        const sql = `SELECT * FROM users`;

        return pool.query(sql);
    }

    // create a static method called addNewEmployee
    static async AddNewEmployee(firstName: string, lastName: string, roleId: number, managerId?: number) {
        const sql = `INSERT INTO users (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
        const VALUES = [firstName, lastName, roleId, managerId];
        return pool.query(sql, VALUES);
    }

    // create a static method called deleteEmployee
    static async DeleteEmployee(userId: number) {
        const sql = `DELETE FROM users WHERE id = $1`;
        const VALUES = [userId];
        return pool.query(sql, VALUES);
    }

    // create a static method called updateEmployee
    static async UpdateEmployeeRole(userId: number, roleId: number) {
        const sql = `UPDATE users SET role_id = $1 WHERE id = $2`;
        const VALUES = [roleId, userId];
        return pool.query(sql, VALUES);
    }
}

// export the department, role, and employee classes
export { department, role, employee };