import inquirer from 'inquirer'; // import inquirer
import * as department from './department.js'; // import the department class
import * as role from './role.js'; // import the role class
import * as employee from './employee.js'; // import the employee class
import { pool } from '../connection.js'; // import the pool object
// create a function called departmentChoices to get the department choices
const departmentChoices = async () => {
    const query = `SELECT id AS value, name FROM departments`;
    const departments = await pool.query(query);
    return departments.rows.map(department => department.name);
};
// create a function called roleChoices to get the role choices
const roleChoices = async () => {
    const query = `SELECT id AS value, title FROM roles`;
    const roles = await pool.query(query);
    return roles.rows.map(role => role.title);
};
// create a function called employeeChoices to get the employee choices
const employeeChoices = async () => {
    const query = `SELECT id AS value, first_name, last_name FROM employees`;
    const employees = await pool.query(query);
    return employees.rows.map(employee => `${employee.first_name} ${employee.last_name}`);
};
// create a class called Cli
class Cli {
    // create a method called viewDepartments
    async viewDepartments() {
        try {
            // Call the getAllDepartments method from the department class
            await department.getAllDepartments();
        }
        catch (error) {
            console.error('Error fetching departments:', error);
        }
        // Restart the CLI
        this.startCli();
    }
    // create a method called addDepartment
    addDepartment() {
        // Prompt the user to enter the department name
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            }
        ]).then((answers) => {
            // Call the addNewDepartment method with the department name
            department.addNewDepartment(answers.name);
            this.startCli();
        });
    }
    // create a method called removeDepartment
    async removeDepartment() {
        // Prompt the user to select a department to delete
        inquirer.prompt([
            {
                type: 'list',
                name: 'department',
                message: 'Which department do you want to delete?',
                choices: await departmentChoices(), // Await the department choices
            }
        ]).then((answers) => {
            // Call the deleteDepartment method with the department name
            department.deleteDepartment(answers.department);
            // Restart the CLI
            this.startCli();
        });
    }
    // create a method called viewRoles
    async viewRoles() {
        try {
            // Call the getAllRoles method from the role class
            await role.getAllRoles();
        }
        catch (error) {
            console.error('Error fetching roles:', error);
        }
        // Restart the CLI
        this.startCli();
    }
    // create a method called addRole
    async addRole() {
        // Prompt the user to enter the role name, salary, and department name
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What is the department of the role?',
                choices: await departmentChoices(), // Await the department choices
            }
        ]);
        // Call the addNewRole method with the role name, salary, and department name
        await role.addNewRole(answers.name, answers.salary, answers.department);
        this.startCli();
    }
    // create a method called removeRole
    async removeRole() {
        // Prompt the user to select a role to delete
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Which role do you want to delete?',
                choices: await roleChoices(), // Await the role choices
            }
        ]).then((answers) => {
            // Call the deleteRole method with the role name
            role.deleteRole(answers.role);
            this.startCli();
        });
    }
    // create a method called viewEmployees
    async viewEmployees() {
        try {
            // Call the getAllEmployees method from the employee class and wait for it to complete
            await employee.getAllEmployees();
        }
        catch (error) {
            console.error('Error fetching employees:', error);
        }
        // Restart the CLI
        this.startCli();
    }
    // create a method called addEmployee
    async addEmployee() {
        try {
            // Get the manager choices from the employeeChoices function
            const managerChoices = await employeeChoices(); // Await the employee choices
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the employee?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the employee?'
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What is the role of the employee?',
                    choices: await roleChoices(), // Await the role choices
                },
                {
                    type: 'list',
                    name: 'manager',
                    message: 'Who is the manager of the employee?',
                    choices: ['none', ...managerChoices] // Spread the manager choices
                }
            ]);
            // Assuming manager's name is stored in a format "First Last"
            if (answers.manager === 'none') {
                // If no manager is selected, set manager to null
                await employee.addNewEmployee(answers.firstName, answers.lastName, answers.role, 'null');
            }
            else {
                // Get the first name of the manager
                const [managerFirstName] = answers.manager.split(' ');
                // Add the new employee with the manager's first name
                await employee.addNewEmployee(answers.firstName, answers.lastName, answers.role, managerFirstName);
            }
            // Restart the CLI
            this.startCli();
        }
        catch (error) {
            console.error('Error adding employee:', error);
        }
    }
    // create a method called updateEmployeeRole
    async updateEmployeeRole() {
        // Prompt the user to select an employee and a new role
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which employee do you want to update?',
                choices: await employeeChoices(), // Await the employee choices
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the new role of the employee?',
                choices: await roleChoices(), // Await the role choices
            }
        ]).then((answers) => {
            // Split the employee name into first and last
            let first_name = answers.name.split(' ')[0];
            let last_name = answers.name.split(' ')[1];
            // Call the updateEmployee method with the first and last name
            employee.updateEmployeeRole(first_name, last_name, answers.role);
            // Restart the CLI
            this.startCli();
        });
    }
    // create a method called removeEmployee
    async removeEmployee() {
        // Prompt the user to select an employee to delete
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee do you want to delete?',
                choices: await employeeChoices(), // Await the employee choices
            }
        ]).then((answers) => {
            // Split the employee name into first and last name
            let first_name = answers.employee.split(' ')[0];
            let last_name = answers.employee.split(' ')[1];
            // Call the deleteEmployee method with the first and last name
            employee.deleteEmployee(first_name, last_name);
            // Restart the CLI
            this.startCli();
        });
    }
    // create a method called startCli
    startCli() {
        // Prompt the user with a list of actions they can take
        console.log('\n');
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Delete a department',
                    'Delete a role',
                    'Delete an employee',
                    'Quit'
                ]
            }
        ]).then((answers) => {
            if (answers.action === 'View all departments') {
                this.viewDepartments();
            }
            else if (answers.action === 'View all roles') {
                this.viewRoles();
            }
            else if (answers.action === 'View all employees') {
                this.viewEmployees();
            }
            else if (answers.action === 'Add a department') {
                this.addDepartment();
            }
            else if (answers.action === 'Add a role') {
                this.addRole();
            }
            else if (answers.action === 'Add an employee') {
                this.addEmployee();
            }
            else if (answers.action === 'Update an employee role') {
                this.updateEmployeeRole();
            }
            else if (answers.action === 'Delete a department') {
                this.removeDepartment();
            }
            else if (answers.action === 'Delete a role') {
                this.removeRole();
            }
            else if (answers.action === 'Delete an employee') {
                this.removeEmployee();
            }
            else {
                // Exit the process
                console.log('Goodbye!');
                process.exit();
            }
        });
    }
}
// export the Cli class
export default Cli;
