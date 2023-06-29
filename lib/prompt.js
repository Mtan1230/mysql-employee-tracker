const inquirer = require('inquirer');

const { connect } = require('../config/connection');

async function main() {
    //connect to the database
    const db = await connect();

    const question = {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add department', 'Quit', new inquirer.Separator('----------------------')]
    };

    const addDepartment = {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the department you would like to add: '
    }

    const addRole = [{
        type: 'input',
        name: 'title',
        message: 'Please enter the title of the role you would like to add: '
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please enter the salary of the role: '
    },
    {
        type: 'input',
        name: 'department_id',
        message: 'Please enter the department id of the role: '
    }
    ]

    const addEmployee = [
        {
            type: 'input',
            name: 'first_name',
            message: 'Please enter the first name of the employee you would like to add: '
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Please enter the last name: '
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Please choose the role: '
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Please choose the manager: '
        }
    ]

    const ans = await inquirer.prompt(question);

    switch (ans.action) {
        case 'View All Departments':
            db.viewAllDepartments();
            main();
            break;
        case 'View All Roles':
            db.viewAllRoles();
            main();
            break;
        case 'View All Employees':
            db.viewAllEmployees();
            main();
            break;

        case 'Add department':
            {
                const input = await inquirer.prompt(addDepartment);
                db.addDepartment(input.name);
                main();
                break;
            }
        case 'Add Role':
            {
                const input = await inquirer.prompt(addRole);
                db.addRole(input.title, input.salary, input.department_id);
                main();
                break;
            }
        case 'Add Employee':
            {
                const input = await inquirer.prompt(addEmployee);
                db.addEmployee(input.first_name, input.last_name, input.role_id, input.manager_id);
                main();
                break;
            }


        default:
            process.exit();
    }
}

module.exports = { main };