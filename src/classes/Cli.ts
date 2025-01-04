import inquirer from 'inquirer'; // import inquirer
import { department, role, employee } from './SQLFunctions.js'; // import SQLFunctions

// create a class called Cli
class Cli {

    // create a method called viewDepartments
    viewDepartments() {
        department.GetAllDepartments().then((res) => {
            console.table(res.rows);
            this.startCli();
        });
    }

    // create a method called viewRoles
    viewRoles() {
        role.GetAllRoles().then((res) => {
            console.table(res.rows);
            this.startCli();
        });
    }

    // create a method called viewEmployees
    viewEmployees() {
        employee.GetAllEmployees().then((res) => {
            console.table(res.rows);
            this.startCli();
        });
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
            department.AddNewDepartment(answers.name).then(() => {
                console.log('Department added successfully');
                this.startCli();
            });
        });
    }

    // create a method called addRole
    addRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'What is the department id of the role?'
            }
        ]).then((answers) => {
            role.AddNewRole(answers.title, answers.salary, answers.departmentId).then(() => {
                console.log('Role added successfully');
                this.startCli();
            });
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
                name: 'roleId',
                message: 'What is the role id of the employee?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is the manager id of the employee?'
            }
        ]).then((answers) => {
            employee.AddNewEmployee(answers.firstName, answers.lastName, answers.roleId, answers.managerId).then(() => {
                console.log('Employee added successfully');
                this.startCli();
            });
        });
    }

    // create a method called updateEmployeeRole
    updateEmployeeRole() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'What is the id of the employee?'
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'What is the new role id of the employee?'
            }
        ]).then((answers) => {
            employee.UpdateEmployeeRole(answers.employeeId, answers.roleId).then(() => {
                console.log('Employee role updated successfully');
                this.startCli();
            });
        });

    }

    // create a method called startCli
    startCli(): void {
        // Prompt the user with a list of actions they can take
        inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
            }
        ]).then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    this.viewDepartments();
                    break;
                case 'View all roles':
                    this.viewRoles();
                    break;
                case 'View all employees':
                    this.viewEmployees();
                    break;
                case 'Add a department':
                    this.addDepartment();
                    break;
                case 'Add a role':
                    this.addRole();
                    break;
                case 'Add an employee':
                    this.addEmployee();
                    break;
                case 'Update an employee role':
                    this.updateEmployeeRole();
                    break;
            }
        });
    }
}

// export the Cli class
export default Cli;