import inquirer from 'inquirer'; // import inquirer
import * as department from './department.js'; // import the department class
import * as role from './role.js'; // import the role class
import * as employee from './employee.js'; // import the employee class
// create a class called Cli
class Cli {
    // create a method called viewDepartments
    viewDepartments() {
        try {
            department.getAllDepartments();
        }
        catch (error) {
            console.error('Error fetching departments:', error);
        }
        return this.startCli();
    }
    // create a method called viewRoles
    viewRoles() {
        try {
            console.log('Roles:');
            role.getAllRoles();
        }
        catch (error) {
            console.error('Error fetching roles:', error);
        }
        this.startCli();
    }
    // create a method called viewEmployees
    viewEmployees() {
        try {
            console.log('Employees:');
            employee.getAllEmployees();
        }
        catch (error) {
            console.error('Error fetching employees:', error);
        }
        this.startCli();
    }
    // create a method called addDepartment
    addDepartment() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            }
        ]).then((answers) => {
            department.addNewDepartment(answers.name);
            console.log('Department added successfully');
            this.startCli();
        });
    }
    // create a method called addRole
    addRole() {
        inquirer.prompt([
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
                type: 'input',
                name: 'department',
                message: 'What is the department of the role?'
            }
        ]).then((answers) => {
            role.addNewRole(answers.title, answers.salary, answers.department);
            console.log('Role added successfully');
            this.startCli();
        });
    }
    // create a method called addEmployee
    addEmployee() {
        inquirer.prompt([
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
                type: 'input',
                name: 'role',
                message: 'What is the role of the employee?'
            },
            {
                type: 'input',
                name: 'manager',
                message: 'Who is the manager of the employee?'
            }
        ]).then((answers) => {
            employee.addNewEmployee(answers.firstName, answers.lastName, answers.role, answers.manager);
            console.log('Employee added successfully');
            this.startCli();
        });
    }
    // create a method called updateEmployeeRole
    updateEmployeeRole() {
        inquirer.prompt([
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
                type: 'input',
                name: 'role',
                message: 'What is the new role of the employee?'
            }
        ]).then((answers) => {
            employee.updateEmployeeRole(answers.firstName, answers.lastName, answers.role);
            console.log('Employee role updated successfully');
            this.startCli();
        });
    }
    // create a method called startCli
    startCli() {
        // Prompt the user with a list of actions they can take
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [{
                        name: 'View all departments',
                        value: 'View_all_departments'
                    }, {
                        name: 'View all roles',
                        value: 'View_all_roles'
                    }, /*{
                        name: 'View all employees',
                        value: 'View all employees'
                    }, {
                        name: 'Add a department',
                        value: 'Add a department'
                    }, {
                        name: 'Add a role',
                        value: 'Add a role'
                    }, {
                        name: 'Add an employee',
                        value: 'Add an employee'
                    }, {
                        name: 'Update an employee role',
                        value: 'Update an employee role'
                    }*/
                ]
            }
        ]).then((answers) => {
            if (answers.action === 'View_all_departments') {
                this.viewDepartments();
            }
            else if (answers.action === 'View_all_roles') {
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
        });
    }
}
// export the Cli class
export default Cli;
